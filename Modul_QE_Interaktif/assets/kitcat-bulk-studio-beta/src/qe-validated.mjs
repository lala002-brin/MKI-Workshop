import {generatePWInput} from './qe-input.mjs';
import {validatePWSetup} from './upf-validator.mjs';
import {StructureError} from './structure-core.mjs';
/** Explicit preflight wrapper. Refuses to export when a checked error is present. */
export function generateValidatedPWInput(structure,config,upfFiles={}){
 const preflight=validatePWSetup(structure,config,upfFiles);
 if(preflight.status==='blocked')throw new StructureError('PREFLIGHT_BLOCKED',preflight.issues.filter(i=>i.severity==='error').map(i=>i.message).join(' | '));
 const generated=generatePWInput(structure,config);
 return {...generated,preflight,manifest:{...generated.manifest,preflightStatus:preflight.status,preflightIssues:preflight.issues}};
}
