export const PRESET_VERSION=1;
export const SELECT_IDS=['isoPositive','isoNegative','isoQuality','isoChannel','isoOpacity','isoPlusColor','isoMinusColor','showAtoms','atomRadius','atomColorMode','atomColor','showBonds','bondFactor','bondColor','showLegend','cameraBg','isoAnnotate','isoFigureLegend','isoFigureTitle','isoScalarUnits','isoFigureNote','isoPaper','isoExportScale','isoTransparentBg','fixedSpanAngstrom','seriesBasis'];
const BOOL=new Set(['showAtoms','showBonds','showLegend','isoAnnotate','isoFigureLegend','isoTransparentBg']);
export function validatePreset(obj){
 if(!obj||typeof obj!=='object'||obj.schema!=='kitcat.cd.figure-consistency'||obj.version!==PRESET_VERSION||!obj.controls||typeof obj.controls!=='object')throw Error('Not a KITCAT 1.8 consistency preset.');
 const rot=obj.camera;if(!rot||!['rotX','rotY','zoom'].every(k=>Number.isFinite(rot[k])))throw Error('Invalid camera coordinates.');
 if(rot.zoom<.25||rot.zoom>5||Math.abs(rot.rotX)>50||Math.abs(rot.rotY)>50)throw Error('Camera outside accepted range.');
 for(const id of SELECT_IDS){if(!(id in obj.controls))throw Error('Missing setting: '+id);const v=obj.controls[id];if(BOOL.has(id)){if(typeof v!=='boolean')throw Error('Invalid toggle: '+id)}else if(typeof v!=='string'||v.length>150)throw Error('Invalid value: '+id)}
 const pos=Number(obj.controls.isoPositive),neg=Number(obj.controls.isoNegative),span=Number(obj.controls.fixedSpanAngstrom);
 if(!(pos>0&&neg>0&&Number.isFinite(pos)&&Number.isFinite(neg)))throw Error('Positive iso-level magnitudes required.');
 if(!Number.isFinite(span)||span<0||span>100000)throw Error('Invalid physical framing span.');
 for(const id of ['isoPlusColor','isoMinusColor','cameraBg','atomColor','bondColor'])if(!/^#[0-9a-f]{6}$/i.test(obj.controls[id]))throw Error('Invalid color: '+id);
 if(!['20','30','42'].includes(obj.controls.isoQuality)||!['both','positive','negative'].includes(obj.controls.isoChannel))throw Error('Invalid quality/channel.');
 if(!['landscape','journal','wide'].includes(obj.controls.isoPaper)||!['1','2','3'].includes(obj.controls.isoExportScale))throw Error('Invalid figure output settings.');
 if(typeof obj.name!=='string'||obj.name.length>65)throw Error('Invalid preset name.');
 return obj;
}
export function comparablePreset(a,b){validatePreset(a);validatePreset(b);return SELECT_IDS.every(id=>a.controls[id]===b.controls[id])&&['rotX','rotY','zoom'].every(k=>Math.abs(a.camera[k]-b.camera[k])<1e-10)}
