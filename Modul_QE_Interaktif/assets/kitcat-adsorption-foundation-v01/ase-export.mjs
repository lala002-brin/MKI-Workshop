import {checkSlab} from './adsorption-core.mjs';

const bool3=(a,defaultValue)=>Array.isArray(a)&&a.length===3&&a.every(x=>typeof x==='boolean')?a:[...defaultValue];
export function constrainedAxes(atom){
  if (Array.isArray(atom.fixedAxes)&&atom.fixedAxes.length===3) return atom.fixedAxes.map(Boolean);
  if (Array.isArray(atom.selectiveDynamics)&&atom.selectiveDynamics.length===3) return atom.selectiveDynamics.map(x=>!Boolean(x));
  return [false,false,false];
}
export function asePayload(structure,{pbc=[true,true,false]}={}){
  checkSlab(structure);
  if(!Array.isArray(pbc)||pbc.length!==3||pbc.some(x=>typeof x!=='boolean')) throw Error('PBC harus tiga nilai boolean');
  const atoms=structure.atoms.map(a=>({element:a.element,fractional:[...a.fractional],fixed_axes:constrainedAxes(a),id:String(a.id??'')}));
  return {format:'KITCAT_ASE_COMPATIBLE_DRAFT_0_2',cell:structure.lattice.map(v=>[...v]),pbc:[...pbc],atoms,source_metadata:structure.metadata??{}};
}
export function asePython(structure,options={}){
  const p=asePayload(structure,options);
  // Double-encoding the JSON makes the payload a Python string literal (not Python data syntax).
  // Ensure script text is safe even if metadata contains arbitrary newlines / quote characters.
  const encoded=JSON.stringify(JSON.stringify(p)).replace(/\\u2028/g,'\\\\u2028').replace(/\\u2029/g,'\\\\u2029');
  return `#!/usr/bin/env python3
"""KITCAT Adsorption Studio 0.2 — ASE-compatible geometry reconstruction.
Geometry DRAFT; no ASE site finding, DFT relaxation, UPF or validated QE input.
Run: python3 kitcat_adsorption_ase.py
Requires: pip install ase
"""
import json
from pathlib import Path
from ase import Atoms
from ase.constraints import FixAtoms, FixCartesian
from ase.io import write

payload = json.loads(${encoded})
records = payload["atoms"]
model = Atoms(
    symbols=[a["element"] for a in records],
    scaled_positions=[a["fractional"] for a in records],
    cell=payload["cell"],
    pbc=payload["pbc"],
)
fixed_all = [i for i, a in enumerate(records) if all(a["fixed_axes"])]
partial = [(i, a["fixed_axes"]) for i, a in enumerate(records)
           if any(a["fixed_axes"]) and not all(a["fixed_axes"])]
constraints = []
if fixed_all:
    constraints.append(FixAtoms(indices=fixed_all))
for index, fixed_axes in partial:
    constraints.append(FixCartesian(index, mask=fixed_axes))
if constraints:
    model.set_constraint(constraints)

# extxyz preserves the cell / PBC; original KITCAT JSON preserves additional metadata.
output = Path(__file__).with_name("kitcat_adsorption_ase.extxyz")
write(str(output), model, format="extxyz")
print(f"ASE structure: {len(model)} atoms, PBC={model.pbc.tolist()}")
print(f"Constraints: {len(fixed_all)} fully frozen; {len(partial)} partially frozen")
print(f"Written: {output}")
print("WARNING: geometry draft only; inspect site, clashes, vacuum and model settings before HPC.")
`;
}
