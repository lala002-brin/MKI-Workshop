// Dependency-free, lightweight cube isosurface extraction via marching tetrahedra.
// Data values are indexed x-major, z-fastest, matching KITCAT parser.
export function isoMesh(cube,level,{maxCells=30,maxTriangles=35000}={}){
 if(cube?.kind!=='cube'||!Number.isFinite(level))throw Error('A 3D cube and finite isovalue are required');
 const [nx,ny,nz]=cube.dims;if(Math.min(nx,ny,nz)<2)throw Error('Need at least 2 grid points per dimension');
 const stride=[nx,ny,nz].map(n=>Math.max(1,Math.ceil((n-1)/maxCells)));
 const indices=(n,st)=>{const r=[];for(let a=0;a<n-1;a+=st)r.push(a);r.push(n-1);return r};
 const xs=indices(nx,stride[0]),ys=indices(ny,stride[1]),zs=indices(nz,stride[2]);
 const corners=[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]];
 const tetra=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]];
 const get=(x,y,z)=>cube.values[(x*ny+y)*nz+z];
 const position=(x,y,z)=>[0,1,2].map(k=>cube.origin[k]+x*cube.vectors[0][k]+y*cube.vectors[1][k]+z*cube.vectors[2][k]);
 const triangles=[];let capped=false;
 function edge(a,b){let t=(level-a.v)/(b.v-a.v);t=Math.max(0,Math.min(1,t));return a.p.map((v,k)=>v+(b.p[k]-v)*t)}
 outer:for(let i=0;i<xs.length-1;i++)for(let j=0;j<ys.length-1;j++)for(let k=0;k<zs.length-1;k++){
 const lo=[xs[i],ys[j],zs[k]],hi=[xs[i+1],ys[j+1],zs[k+1]];
 const vertices=corners.map(q=>{const idx=q.map((v,d)=>v?hi[d]:lo[d]);return {v:get(...idx),p:position(...idx)}});
 for(const tet of tetra){const inside=tet.filter(q=>vertices[q].v>=level),outside=tet.filter(q=>vertices[q].v<level);if(!inside.length||inside.length===4)continue;
 const v=q=>vertices[q];let parts;
 if(inside.length===1){const a=v(inside[0]);parts=[[edge(a,v(outside[0])),edge(a,v(outside[1])),edge(a,v(outside[2]))]]}
 else if(inside.length===3){const a=v(outside[0]);parts=[[edge(a,v(inside[0])),edge(a,v(inside[2])),edge(a,v(inside[1]))]]}
 else{const a=v(inside[0]),b=v(inside[1]),c=v(outside[0]),d=v(outside[1]);const ac=edge(a,c),ad=edge(a,d),bc=edge(b,c),bd=edge(b,d);parts=[[ac,bc,ad],[ad,bc,bd]]}
 for(const tri of parts){triangles.push(tri);if(triangles.length>=maxTriangles){capped=true;break outer}}
 }
 }
 return {triangles,capped,sampledCells:[xs.length-1,ys.length-1,zs.length-1],level};
}
export function cameraProject(p,{center=[0,0,0],rotX=.42,rotY=-.62,zoom=1}={}){
 let x=(p[0]-center[0]),y=(p[1]-center[1]),z=(p[2]-center[2]);
 const cy=Math.cos(rotY),sy=Math.sin(rotY),cx=Math.cos(rotX),sx=Math.sin(rotX);
 const xx=x*cy+z*sy,zz=-x*sy+z*cy,yy=y*cx-zz*sx,depth=y*sx+zz*cx;
 return [xx*zoom,yy*zoom,depth];
}
