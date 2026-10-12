import {readCube,readXYZ,viewData,range,subtractCubes,compareCubeGrids,planarProfile,chargeBetween,interfaceMoments} from './parser.mjs';
const $=id=>document.getElementById(id);let data=null,current=null,svgText='';const NS='http://www.w3.org/2000/svg';
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function lerp(a,b,t){return a.map((v,i)=>Math.round(v*(1-t)+b[i]*t))}function rgb(r){return `rgb(${r.join(',')})`}
function ramp(t,p){t=Math.max(0,Math.min(1,t));const stops=p==='gray'?[[0,[20,20,20]],[1,[250,250,250]]]:p==='warm'?[[0,[255,252,235]],[.45,[253,187,98]],[1,[153,29,38]]]:p==='viridis'?[[0,[68,1,84]],[.25,[58,82,139]],[.5,[32,144,140]],[.75,[94,201,98]],[1,[253,231,37]]]:[[0,[35,89,173]],[.5,[255,255,255]],[1,[191,41,48]]];for(let i=1;i<stops.length;i++)if(t<=stops[i][0]){let a=stops[i-1],b=stops[i];return rgb(lerp(a[1],b[1],(t-a[0])/(b[0]-a[0])))}return rgb(stops.at(-1)[1])}
function node(tag,props={},content=''){let attrs=Object.entries(props).map(([k,v])=>` ${k}="${esc(v)}"`).join('');return `<${tag}${attrs}>${content}</${tag}>`}
function demo(){let nx=58,ny=46,values=new Float64Array(nx*ny);for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){let x=(i-nx/2)/12,y=(j-ny/2)/12;values[j*nx+i]=Math.exp(-((x-1)**2+(y+.5)**2)/.4)-.7*Math.exp(-((x+1)**2+(y-.4)**2)/.6)}return {kind:'xy',nx,ny,values,source:'SYNTHETIC DEMO — NOT QE DATA',units:'arbitrary',note:'Synthetic field for testing only.'}}
function render(){if(!data)return;const plane=$('plane').value;const maxIndex=data.kind==='cube'?data.dims[{x:0,y:1,z:2}[plane]]-1:0; $('index').max=maxIndex;$('index').disabled=data.kind!=='cube';const idx=Math.max(0,Math.min(maxIndex,Number($('index').value)||0));$('index').value=idx;current=viewData(data,plane,idx);
 let {nx,ny,values}=current,{min,max}=range(values),lo=min,hi=max;const sc=$('scale').value;if(sc==='manual'){lo=Number($('min').value);hi=Number($('max').value);if(!Number.isFinite(lo)||!Number.isFinite(hi)||lo>=hi){$('stat').textContent='Error: range manual harus min < max';return}}else if(sc==='symmetric'||($('meaning').value==='difference'&&$('zero').checked)){let a=Math.max(Math.abs(min),Math.abs(max),1e-15);lo=-a;hi=a}else if(lo===hi){lo-=1;hi+=1}
 let [W,H]=$('size').value.split(',').map(Number),margin={l:105,r:180,t:115,b:105},w=W-margin.l-margin.r,h=H-margin.t-margin.b;let grid='';// render each pixel with native SVG rectangles, cap to avoid very huge vector
 if(nx*ny>90000){$('stat').textContent='Grid 2D terlalu besar untuk SVG (maks. 90.000 pixel). Pilih slice/grid lebih kecil.';return}
 for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){let val=values[j*nx+i],t=(val-lo)/(hi-lo);grid+=`<rect x="${(margin.l+i*w/nx).toFixed(3)}" y="${(margin.t+(ny-1-j)*h/ny).toFixed(3)}" width="${(w/nx+.04).toFixed(3)}" height="${(h/ny+.04).toFixed(3)}" fill="${ramp(t,$('palette').value)}"/>`}
 let overlays=$('grid').checked?Array.from({length:6},(_,i)=>{let x=margin.l+i*w/5,y=margin.t+i*h/5;return `<path d="M${x} ${margin.t}V${margin.t+h} M${margin.l} ${y}H${margin.l+w}" stroke="#1f3444" stroke-opacity=".25" stroke-width=".7"/>`}).join(''):'';
 const title=$('title').value||'Scalar field slice';const cbx=margin.l+w+55,cby=margin.t,cbw=24,cbh=h;let cb='';for(let k=0;k<96;k++)cb+=`<rect x="${cbx}" y="${cby+(95-k)*cbh/96}" width="${cbw}" height="${cbh/96+.1}" fill="${ramp(k/95,$('palette').value)}"/>`;
 let ticks='';for(let i=0;i<=5;i++){let t=i/5,v=lo+t*(hi-lo),y=cby+(1-t)*cbh;ticks+=node('text',{x:cbx+34,y:y+4,'font-size':Math.max(13,W/90),'font-family':'Arial','fill':'#33495a'},Number(v.toPrecision(4)).toString())}
 let water=data.source.includes('SYNTHETIC')?node('text',{x:W/2,y:margin.t+h/2,'text-anchor':'middle','font-size':25,'font-family':'Arial',fill:'#152536','fill-opacity':'.7',transform:`rotate(-20 ${W/2} ${margin.t+h/2})`},'SYNTHETIC DEMO'):'', lab=title;
 svgText=`<svg xmlns="${NS}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="white"/>${node('text',{x:W/2,y:48,'text-anchor':'middle','font-family':'Arial','font-weight':700,'font-size':Math.max(21,W/43),fill:'#273a4f'},lab)}${node('text',{x:W/2,y:78,'text-anchor':'middle','font-family':'Arial','font-size':Math.max(13,W/77),fill:'#5a6d7c'},esc(current.extent+' · '+data.source))}${grid}${overlays}<rect x="${margin.l}" y="${margin.t}" width="${w}" height="${h}" fill="none" stroke="#354a5e" stroke-width="1.6"/>${cb}<rect x="${cbx}" y="${cby}" width="${cbw}" height="${cbh}" fill="none" stroke="#384c5f"/>${ticks}${node('text',{x:margin.l+w/2,y:H-55,'text-anchor':'middle','font-family':'Arial','font-size':19,fill:'#31495e'},data.kind==='cube'?'Grid index (voxel-axis projection)':'X coordinate / grid')}${node('text',{x:29,y:margin.t+h/2,transform:`rotate(-90 29 ${margin.t+h/2})`,'text-anchor':'middle','font-family':'Arial','font-size':19,fill:'#31495e'},data.kind==='cube'?'Grid index':'Y coordinate / grid')}${water}${node('text',{x:W/2,y:H-18,'text-anchor':'middle','font-family':'Arial','font-size':12,fill:'#66798a'},'KITCAT | Source values unmodified; colors are visualization only')}</svg>`;
 $('figure').innerHTML=svgText;$('stat').textContent=`${current.description} | voxels ${nx}×${ny} | value min ${min.toPrecision(6)}, max ${max.toPrecision(6)} | colors ${lo.toPrecision(5)} to ${hi.toPrecision(5)}. ${data.note}`;
}
function save(name,blob){let a=document.createElement('a'),u=URL.createObjectURL(blob);a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1200)}
function raster(type){if(!svgText)return;let [W,H]=$('size').value.split(',').map(Number),fac=Number($('factor').value),can=document.createElement('canvas');can.width=W*fac;can.height=H*fac;let ctx=can.getContext('2d'),im=new Image(),u=URL.createObjectURL(new Blob([svgText],{type:'image/svg+xml'}));im.onload=()=>{ctx.fillStyle='#fff';ctx.fillRect(0,0,can.width,can.height);ctx.drawImage(im,0,0,can.width,can.height);can.toBlob(b=>{if(b)save('kitcat_charge_density.'+(type==='image/png'?'png':'jpg'),b);URL.revokeObjectURL(u)},type,.95)};im.onerror=()=>{$('stat').textContent='Ekspor raster gagal; coba SVG';URL.revokeObjectURL(u)};im.src=u}
$('upload').addEventListener('change',async e=>{let f=e.target.files[0];if(!f)return;try{let t=await f.text();data=/\.(cube|cub)$/i.test(f.name)?readCube(t):readXYZ(t);data.source=f.name;$('source').textContent=`Loaded: ${f.name} | ${data.kind==='cube'?data.dims.join('×')+' voxel':'2D grid '+data.nx+'×'+data.ny} | ${data.note}`;render()}catch(err){$('source').textContent='Error: '+err.message;data=null;svgText='';$('figure').textContent='Tidak ada data valid'}});
$('example').onclick=()=>{data=demo();$('meaning').value='difference';$('source').textContent='SYNTHETIC DEMO (not QE data)';render()};
for(let id of ['plane','index','palette','scale','min','max','title','size','grid','zero','meaning'])$(id).addEventListener('input',render);
$('svg').onclick=()=>{if(svgText)save('kitcat_charge_density.svg',new Blob([svgText],{type:'image/svg+xml;charset=utf-8'}))};$('png').onclick=()=>raster('image/png');$('jpg').onclick=()=>raster('image/jpeg');$('csv').onclick=()=>{if(!current)return;let out=['i,j,value'];for(let j=0;j<current.ny;j++)for(let i=0;i<current.nx;i++)out.push(`${i},${j},${current.values[j*current.nx+i]}`);save('kitcat_charge_slice.csv',new Blob([out.join('\n')],{type:'text/csv'}))};

// Export the mathematically calculated difference as a Gaussian cube, preserving the total cube header.
let differenceCube=null,differenceHeader=null;
$('calculateDifference').onclick=async()=>{
 $('exportDifference').disabled=true;differenceCube=null;differenceHeader=null;
 try{const files=['cubeTotal','cubeA','cubeB'].map(id=>$(id).files?.[0]);if(files.some(x=>!x))throw Error('Choose three Gaussian cube files');
 const texts=await Promise.all(files.map(f=>f.text()));const cubes=texts.map(readCube);
 differenceCube=subtractCubes(...cubes);
 // Preserve total-cube header, including atomic positions; only replace scalar values.
 let totalLines=texts[0].replace(/\r/g,'').split('\n'),nat=Number(totalLines[2].trim().split(/\s+/)[0]);differenceHeader=totalLines.slice(0,6+nat).join('\n');
 data=differenceCube;data.source='Δρ: '+files.map(f=>f.name).join(' − ');
 $('meaning').value='difference';$('palette').value='diverge';$('scale').value='symmetric';$('title').value='Charge-density difference Δρ';$('source').textContent=data.source;
 $('differenceStatus').textContent='PASS: identical grid dimensions, origin, voxel vectors and coordinate units. Min '+differenceCube.deltaStats.min.toPrecision(5)+'; max '+differenceCube.deltaStats.max.toPrecision(5)+'. Please verify physical comparability of the three QE runs.';
 $('exportDifference').disabled=false;render();
 }catch(e){$('differenceStatus').textContent='NOT CALCULATED: '+e.message;differenceCube=null;}
};
$('exportDifference').onclick=()=>{if(!differenceCube||!differenceHeader)return;let lines=[differenceHeader],values=differenceCube.values;for(let i=0;i<values.length;i+=6)lines.push(Array.from(values.slice(i,i+6),v=>v.toExponential(9)).join(' '));save('kitcat_charge_density_difference.cube',new Blob([lines.join('\n')+'\n'],{type:'text/plain'}))};

// Planar-averaged profile and integrated electron-number difference; no silent resampling.
let profile=null,profileFigureSvg='';
function profilePlot(p){
 const W=1200,H=690,L=120,R=110,T=80,B=110,ww=W-L-R,hh=H-T-B;
 const v=p.points, xmax=Math.max(...v.map(x=>x.distanceAng)), ymin=Math.min(0,...v.map(x=>x.mean)),ymax=Math.max(0,...v.map(x=>x.mean));
 const ymin2=Math.min(...v.map(x=>x.cumulativeElectrons),0),ymax2=Math.max(...v.map(x=>x.cumulativeElectrons),0);
 const yscale=(num,a,b)=>T+hh*(1-(num-a)/(b-a||1));const xp=x=>L+ww*x/(xmax||1);
 const path=(key,a,b)=>v.map((pt,i)=>(i?'L':'M')+xp(pt.distanceAng).toFixed(3)+' '+yscale(pt[key],a,b).toFixed(3)).join(' ');
 let ticks='';for(let i=0;i<=5;i++){const f=i/5,y=T+hh*(1-f),xx=L+ww*f;
 ticks+=`<path d="M${L} ${y}H${W-R}" stroke="#dce4ed"/><text x="${L-14}" y="${y+5}" text-anchor="end" fill="#405568" font-size="17">${Number((ymin+f*(ymax-ymin)).toPrecision(3))}</text><text x="${W-R+12}" y="${y+5}" fill="#405568" font-size="17">${Number((ymin2+f*(ymax2-ymin2)).toPrecision(3))}</text><path d="M${xx} ${T}V${H-B}" stroke="#eaf0f5"/><text x="${xx}" y="${H-B+32}" text-anchor="middle" fill="#405568" font-size="17">${(f*xmax).toFixed(2)}</text>`}
 return `<svg xmlns="${NS}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="white"/><text x="${W/2}" y="38" font-size="25" font-weight="bold" fill="#203850" text-anchor="middle">Planar-averaged density & cumulative integral</text>${ticks}<path d="M${L} ${T}V${H-B}H${W-R}V${T}" fill="none" stroke="#44586b" stroke-width="1.6"/><path d="${path('mean',ymin,ymax)}" stroke="#1764ae" stroke-width="3" fill="none"/><path d="${path('cumulativeElectrons',ymin2,ymax2)}" stroke="#bf4b38" stroke-width="3" fill="none"/><text x="${W/2}" y="${H-25}" fill="#203850" font-size="20" text-anchor="middle">Distance along voxel axis (Å)</text><text x="33" y="${T+hh/2}" transform="rotate(-90 33 ${T+hh/2})" text-anchor="middle" fill="#1764ae" font-size="18">Plane-averaged density (${esc(p.densityUnit)})</text><text x="${W-18}" y="${T+hh/2}" transform="rotate(90 ${W-18} ${T+hh/2})" text-anchor="middle" fill="#bf4b38" font-size="18">Cumulative integral (electrons)</text><path d="M320 54h35" stroke="#1764ae" stroke-width="3"/><text x="362" y="59" font-size="15" fill="#203850">Planar average</text><path d="M550 54h35" stroke="#bf4b38" stroke-width="3"/><text x="592" y="59" font-size="15" fill="#203850">Cumulative integral</text><text x="${W/2}" y="${H-5}" text-anchor="middle" font-size="12" fill="#617588">KITCAT — lattice-axis coordinate; not automatically surface-normal</text></svg>`;
}
$('analyzeProfile').onclick=()=>{
 try{
 if(!data||data.kind!=='cube')throw Error('Load a 3D Gaussian cube or calculate Δρ first');
 profile=planarProfile(data,$('profileAxis').value,$('densityUnit').value);
 const n=profile.points.length;$('chargeEnd').max=n;
 if(Number($('chargeEnd').value)>n||Number($('chargeEnd').value)<2)$('chargeEnd').value=n;
 let a=Number($('chargeStart').value),b=Number($('chargeEnd').value),between=chargeBetween(profile,a,b);
 profileFigureSvg=profilePlot(profile);$('profileFigure').innerHTML=profileFigureSvg;
 $('profileStatus').textContent=`Axis ${profile.axis}, ${n} planes; step ${profile.stepAng.toPrecision(6)} Å; whole-grid integral ${profile.totalElectrons.toPrecision(7)} electrons; selected planes [${a},${b}) integral ${between.chargeElectrons.toPrecision(7)} electrons. CAUTION: ${profile.nonOrthogonal}`;
 }catch(e){profile=null;profileFigureSvg='';$('profileFigure').textContent='';$('profileStatus').textContent='NOT CALCULATED: '+e.message;}
};
for(let id of ['chargeStart','chargeEnd'])$(id).addEventListener('change',()=>{if(profile)$('analyzeProfile').click()});
$('profileCsv').onclick=()=>{if(!profile)return;$('profileStatus').textContent+=' | CSV downloaded';let lines=['plane,distance_along_axis_ang,mean_density_'+profile.densityUnit.replace('/','_per_')+',plane_integral_electrons,cumulative_electrons',...profile.points.map(r=>[r.index,r.distanceAng,r.mean,r.planeCharge,r.cumulativeElectrons].join(','))];save('kitcat_planar_charge_profile.csv',new Blob([lines.join('\n')],{type:'text/csv'}))};
$('profileSvg').onclick=()=>{if(profileFigureSvg)save('kitcat_planar_charge_profile.svg',new Blob([profileFigureSvg],{type:'image/svg+xml'}))};
$('profilePng').onclick=()=>{if(!profileFigureSvg)return;const c=document.createElement('canvas'),image=new Image(),uri=URL.createObjectURL(new Blob([profileFigureSvg],{type:'image/svg+xml'}));c.width=3600;c.height=2070;image.onload=()=>{const ctx=c.getContext('2d');ctx.drawImage(image,0,0,c.width,c.height);c.toBlob(b=>{if(b)save('kitcat_planar_charge_profile.png',b);URL.revokeObjectURL(uri)},'image/png')};image.onerror=()=>{URL.revokeObjectURL(uri);$('profileStatus').textContent='PNG error; export SVG instead.'};image.src=uri};

// Interface partition derived from the current, user-reviewed planar profile.
let interfaceResult=null;
function refreshRegionBounds(){
 if(!profile)return;
 const n=profile.points.length;for(const id of ['dipoleStart','dipoleEnd'])$(id).max=n;
 if(+$('dipoleEnd').value>n||+$('dipoleEnd').value<=1)$('dipoleEnd').value=n;
}
$('computeDipole').onclick=()=>{
 try{
  if(!profile)throw Error('Calculate the planar profile first (section 05).');
  refreshRegionBounds();
  let a=Number($('dipoleStart').value),b=Number($('dipoleEnd').value);
  const mode=$('dipoleRefMode').value,ref=mode==='start'?null:Number($('dipoleReference').value);
  interfaceResult=interfaceMoments(profile,a,b,ref);
  if(mode==='start')$('dipoleReference').value=interfaceResult.referenceAng.toPrecision(8);
  let r=interfaceResult;
  $('dipoleSummary').textContent=`Positive Δρ integral: ${r.positiveElectrons.toPrecision(8)} e | Negative Δρ integral: ${r.negativeElectrons.toPrecision(8)} e | Net: ${r.netElectrons.toPrecision(8)} e | Electronic first moment: ${r.firstMomentElectronAng.toPrecision(8)} e·Å | Electronic dipole contribution: ${r.electronicDipoleElectronAng.toPrecision(8)} e·Å (${r.electronicDipoleDebye.toPrecision(8)} Debye).`;
  $('dipoleStatus').textContent=`Region [${a},${b}); reference ${r.referenceAng.toPrecision(6)} Å. ${r.warning}`;
 }catch(e){interfaceResult=null;$('dipoleSummary').textContent='';$('dipoleStatus').textContent='REVIEW: '+e.message;}
};
$('dipoleCsv').onclick=()=>{if(!interfaceResult)return;let r=interfaceResult;let rows=['metric,value,unit',...[['start_plane',r.start,'index'],['end_plane_exclusive',r.end,'index'],['reference',r.referenceAng,'angstrom'],['positive_density_integral',r.positiveElectrons,'electron'],['negative_density_integral',r.negativeElectrons,'electron'],['net_density_integral',r.netElectrons,'electron'],['first_moment',r.firstMomentElectronAng,'electron_angstrom'],['electronic_dipole',r.electronicDipoleElectronAng,'electron_angstrom'],['electronic_dipole_debye',r.electronicDipoleDebye,'debye']].map(v=>v.join(','))];save('kitcat_interface_charge_moment.csv',new Blob([rows.join('\n')+'\n'],{type:'text/csv'}))};
$('dipoleJson').onclick=()=>{if(!interfaceResult)return;save('kitcat_interface_charge_audit.json',new Blob([JSON.stringify({schema:'KITCAT-interface-moment-v1',source:data?.source||'unknown',profileAxis:profile.axis,densityUnit:profile.densityUnit,voxelAxisAng:profile.axisVector,nonOrthogonalWarning:profile.nonOrthogonal,region:interfaceResult},null,2)],{type:'application/json'}))};

// Expose only the loaded cube for optional 3D viewer, with no modification of underlying arrays.
window.kitcatChargeCube = () => data?.kind === 'cube' ? data : null;
