// Pure static dashboard report; does not claim chemistry or DFT validity.
export function summarizeValidation(structure, slabCount, contact, {pbc=[true,true,false], hasConfigurations=false}={}) {
 if(!structure || !Array.isArray(structure.atoms) || !Array.isArray(structure.lattice)) throw Error('Struktur aktif tidak ada');
 if(!Number.isInteger(slabCount) || slabCount<1 || slabCount>=structure.atoms.length)throw Error('Struktur belum memuat adsorbat');
 if(!contact || contact.atomCount!==structure.atoms.length || contact.slabCount!==slabCount)throw Error('Laporan kontak tidak sesuai model aktif');
 const atoms=structure.atoms;
 const validFractionals=atoms.every(a=>Array.isArray(a.fractional)&&a.fractional.length===3&&a.fractional.every(Number.isFinite));
 const validElements=atoms.every(a=>typeof a.element==='string'&&/^[A-Z][a-z]?$/.test(a.element));
 const validLattice=structure.lattice.length===3&&structure.lattice.every(v=>Array.isArray(v)&&v.length===3&&v.every(Number.isFinite));
 const complete=validFractionals&&validElements&&validLattice;
 const issues=[];
 if(!complete)issues.push('Koordinat, unsur, atau sel belum valid');
 if(contact.totalContacts>0)issues.push(`${contact.totalContacts} pasangan atom lebih dekat dari ${contact.thresholdAngstrom} Å; tinjau secara manual`);
 const result={status:'GEOMETRY_DRAFT',screening:!complete?'REVIEW_REQUIRED':contact.totalContacts?'REVIEW_REQUIRED':'STATIC_SCREENING_NO_SHORT_CONTACTS',atomCount:atoms.length,slabAtomCount:slabCount,adsorbateAtomCount:atoms.length-slabCount,elements:[...new Set(atoms.map(a=>a.element))].sort(),geometryFieldsComplete:complete,periodicity:pbc,contactAudit:contact,hasConfigurationCandidates:Boolean(hasConfigurations),exportReadiness:{json:complete?'STRUCTURE_FIELDS_PRESENT':'REVIEW_REQUIRED',aseScript:complete?'STRUCTURE_FIELDS_PRESENT_NOT_EXECUTED':'REVIEW_REQUIRED',qeBatch:'NOT_RUNTIME_VALIDATED'},issues,caveats:['Static geometry screening only; lack of short contacts does not imply stability.','PBC checkbox settings are ASE export preferences, not necessarily QE runtime PBC.','QC does not check pseudopotential availability, actual QE input parsing or convergence.','Collision audit uses finite XY periodic images and a user-set distance threshold.']};
 return result;
}
