// KITCAT-VISIBILITY-FIX-2
import {makeViewer as makeCanvasViewer} from './adsorption-viewer-canvas.mjs';
import {buildScene, projectScene, findNearestAtom} from './webgl-geometry.mjs';
const VS=`#version 300 es
precision highp float;
in vec3 aPosition;
in vec3 aColor;
in float aRadius;
uniform float uPointScale;
out vec3 vColor;
void main(){gl_Position=vec4(aPosition,1.0);gl_PointSize=max(2.0,aRadius*uPointScale);vColor=aColor;}`;
const FS=`#version 300 es
precision highp float;
in vec3 vColor;
out vec4 outColor;
void main(){vec2 p=gl_PointCoord*2.0-1.0;float r2=dot(p,p);if(r2>1.0)discard;float z=sqrt(max(0.0,1.0-r2));vec3 normal=normalize(vec3(p.x,-p.y,z));float diffuse=max(dot(normal,normalize(vec3(-0.45,0.65,0.75))),0.0);float spec=pow(max(dot(reflect(normalize(vec3(0.45,-0.65,-0.75)),normal),vec3(0,0,1)),0.0),25.0);outColor=vec4(vColor*(0.34+0.68*diffuse)+vec3(0.55)*spec,1.0);gl_FragDepth=clamp(gl_FragCoord.z-z*0.0008,0.0,1.0);}`;
const LINEVS=`#version 300 es
precision highp float;
in vec3 aPosition;uniform vec3 uLineColor;out vec3 vColor;
void main(){gl_Position=vec4(aPosition,1.0);vColor=uLineColor;}`;
const LINEFS=`#version 300 es
precision highp float;in vec3 vColor;out vec4 outColor;void main(){outColor=vec4(vColor,0.85);}`;
const hexColor=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16)/255);
function shader(gl,type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s}
function program(gl,vs,fs){const p=gl.createProgram();gl.attachShader(p,shader(gl,gl.VERTEX_SHADER,vs));gl.attachShader(p,shader(gl,gl.FRAGMENT_SHADER,fs));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));return p}
function useArray(gl,p,name,data,components){const loc=gl.getAttribLocation(p,name);if(loc<0)return;const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.DYNAMIC_DRAW);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,components,gl.FLOAT,false,0,0);return buf}
export function makeViewer(canvas,info){
 const gl=canvas.getContext('webgl2',{antialias:true,alpha:false,depth:true,preserveDrawingBuffer:false});
 if(!gl){const v=makeCanvasViewer(canvas,info);info.dataset.renderer='canvas';return v}
 let atomP,lineP;try{atomP=program(gl,VS,FS);lineP=program(gl,LINEVS,LINEFS)}catch(err){info.textContent=`WebGL shader error: ${err.message}`;throw err}
 let structure=null,baseCount=0,selected=-1,labels=false,az=.55,el=.35,zoom=1.55,projected=[],drag=null,dragAdsorbate=false,translate=null,showBonds=true,showCell=true,mode='ball';
 let renderPending=false;const requestDraw=()=>{if(renderPending)return;renderPending=true;requestAnimationFrame(()=>{renderPending=false;redraw()})};
 const inverse=(m)=>{const [a,b,c]=m;const cross=(x,y)=>[x[1]*y[2]-x[2]*y[1],x[2]*y[0]-x[0]*y[2],x[0]*y[1]-x[1]*y[0]];const dot=(x,y)=>x.reduce((n,v,i)=>n+v*y[i],0);const v=dot(a,cross(b,c));if(Math.abs(v)<1e-10)return null;return [cross(b,c).map(x=>x/v),cross(c,a).map(x=>x/v),cross(a,b).map(x=>x/v)]};
 const shiftPreview=(original,delta)=>{const inv=inverse(original.lattice);if(!inv)return original;const df=inv.map(row=>row.reduce((n,v,k)=>n+v*delta[k],0));return {...original,atoms:original.atoms.map((a,i)=>i<baseCount?a:{...a,fractional:a.fractional.map((f,k)=>f+df[k])})}};
 const moveDelta=(dx,dy)=>{const rect=canvas.getBoundingClientRect();const len=Math.max(1,Math.min(rect.width,rect.height));const xy=structure?.lattice||[[6,0,0],[0,6,0],[0,0,20]];const scale=Math.max(Math.hypot(...xy[0]),Math.hypot(...xy[1]),4)/len/Math.max(.25,zoom)*1.7;const u=dx*scale,v=-dy*scale;return [u*Math.cos(az)-v*Math.sin(az),u*Math.sin(az)+v*Math.cos(az),0]};
 const status=document.getElementById('webgl-renderer-status');if(status)status.textContent='WebGL2 · VISIBLE BONDS FIX 2';
 function infoText(){if(!structure){info.textContent='Muat slab untuk menggunakan inspector 3D.';return}if(selected<0){info.textContent=`WebGL2 GPU · ${structure.atoms.length} atom · ${Math.max(0,structure.atoms.length-baseCount)} adsorbat · klik atom untuk inspeksi`;return}const a=structure.atoms[selected],p=[0,1,2].map(k=>a.fractional.reduce((sum,f,i)=>sum+f*structure.lattice[i][k],0));info.textContent=`Atom ${selected+1}: ${a.element} (${selected>=baseCount?'adsorbat':'slab'}) · Cartesian (${p.map(n=>n.toFixed(3)).join(', ')}) Å · fraksional (${a.fractional.map(n=>n.toFixed(4)).join(', ')})`}
 function redraw(){
 const box=canvas.getBoundingClientRect(),w=Math.max(280,Math.round(box.width||700)),h=Math.max(240,Math.round(box.height||460)),dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(0.025,0.068,0.125,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);if(!structure?.atoms?.length)return;
 const scene=buildScene(structure,baseCount,{showBonds,showCell});const view=projectScene(scene,{az,el,zoom,width:w,height:h});projected=view.points;
 // Thick screen-space connector ribbons: GL line widths are unreliable in WebGL.
 // Draw behind spheres using triangles so contacts remain visible on macOS/Chrome.
 const bd=[];
 for(const [a,b] of (view.bonds||[])){
   const vx=(b[0]-a[0])*w*.5,vy=(b[1]-a[1])*h*.5;
   const len=Math.hypot(vx,vy);if(len<.01)continue;
   const half=mode==='points'?1.0:mode==='spacefill'?3.5:5.2;
   const ox=-vy/len*half*2/w,oy=vx/len*half*2/h;
   const az0=Math.min(.96,a[2]-.002),bz0=Math.min(.96,b[2]-.002);
   const u=[a[0]+ox,a[1]+oy,az0],v=[a[0]-ox,a[1]-oy,az0];
   const q=[b[0]+ox,b[1]+oy,bz0],r=[b[0]-ox,b[1]-oy,bz0];
   bd.push(...u,...v,...q,...v,...r,...q);
 }
 if(bd.length){gl.useProgram(lineP);const buf=useArray(gl,lineP,'aPosition',bd,3);gl.uniform3fv(gl.getUniformLocation(lineP,'uLineColor'),new Float32Array([.68,.79,.92]));gl.drawArrays(gl.TRIANGLES,0,bd.length/3);gl.deleteBuffer(buf)}
 gl.useProgram(lineP);const ldata=[];for(const line of view.lines)ldata.push(...line[0],...line[1]);if(ldata.length){const b=useArray(gl,lineP,'aPosition',ldata,3);gl.uniform3fv(gl.getUniformLocation(lineP,'uLineColor'),new Float32Array([0.67,0.77,0.89]));gl.drawArrays(gl.LINES,0,ldata.length/3);gl.deleteBuffer(b)}
 const pts=view.points.slice().sort((a,b)=>a.depth-b.depth);const position=[],color=[],radius=[];for(const a of pts){position.push(a.clipx,a.clipy,a.clipz);color.push(...hexColor(a.i===selected?'#ffe087':a.color));radius.push(mode==='points'?2.6:a.i===selected?24:mode==='spacefill'?21:16)}
 gl.useProgram(atomP);const bp=useArray(gl,atomP,'aPosition',position,3),bc=useArray(gl,atomP,'aColor',color,3),br=useArray(gl,atomP,'aRadius',radius,1);gl.uniform1f(gl.getUniformLocation(atomP,'uPointScale'),dpr);gl.drawArrays(gl.POINTS,0,pts.length);[bp,bc,br].forEach(b=>gl.deleteBuffer(b));
 if(labels){const overlay=document.getElementById('webgl-atom-labels');if(overlay){overlay.replaceChildren();if(pts.length<=120)for(const a of pts){const el=document.createElement('span');el.textContent=`${a.element}${a.i+1}`;el.style.cssText=`position:absolute;left:${a.px+7}px;top:${a.py-17}px;color:white;font:10px sans-serif;pointer-events:none;text-shadow:0 1px 3px black`;overlay.appendChild(el)}}}else{document.getElementById('webgl-atom-labels')?.replaceChildren()}
 }
 function pointer(e){const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}}
 canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;const p=pointer(e);const idx=findNearestAtom(projected,p,24);const moving=Boolean(structure&&translate&&(dragAdsorbate||idx>=baseCount&&idx>=0));drag={...p,az,el,moved:false,moving,original:structure,delta:[0,0,0]};canvas.style.cursor=moving?'grabbing':'grab';canvas.setPointerCapture?.(e.pointerId)});
 canvas.addEventListener('pointermove',e=>{const p=pointer(e);if(!drag){const idx=findNearestAtom(projected,p,22);canvas.style.cursor=translate&&idx>=baseCount&&idx>=0?'move':'grab';return}if(Math.hypot(p.x-drag.x,p.y-drag.y)>3)drag.moved=true;if(!drag.moved)return;if(drag.moving){drag.delta=moveDelta(p.x-drag.x,p.y-drag.y);structure=shiftPreview(drag.original,drag.delta);requestDraw()}else{az=drag.az+(p.x-drag.x)*.008;el=Math.max(-1.48,Math.min(1.48,drag.el+(p.y-drag.y)*.008));requestDraw()}});
 canvas.addEventListener('pointerup',e=>{if(!drag)return;const p=pointer(e);const d=drag;drag=null;canvas.style.cursor='grab';if(d.moving){structure=d.original;if(d.moved&&Math.hypot(...d.delta)>.00001)translate?.(d.delta);else redraw()}else if(!d.moved){selected=findNearestAtom(projected,p,22);infoText();redraw()}});
 canvas.addEventListener('pointercancel',()=>{if(drag?.moving){structure=drag.original;redraw()}drag=null;canvas.style.cursor='grab'});
 canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(0.25,Math.min(6,zoom*(e.deltaY>0?.9:1.1)));redraw()},{passive:false});
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(()=>redraw()).observe(canvas);
 return {setStructure(s,count){structure=s;baseCount=Math.max(0,count||0);selected=-1;infoText();redraw()},reset(){az=.55;el=.35;zoom=1.55;redraw()},setLabels(v){labels=Boolean(v);redraw()},redraw,setDragAdsorbate(v){dragAdsorbate=Boolean(v)},onTranslate(fn){translate=fn},setRepresentation(v){mode=v;redraw()},setBonds(v){showBonds=Boolean(v);redraw()},setCell(v){showCell=Boolean(v);redraw()}};
}