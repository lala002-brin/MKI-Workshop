#!/usr/bin/env python3
"""CIF/POSCAR/XYZ (with cell) -> structural FDF block only. Requires ASE."""
import argparse
from pathlib import Path
from ase.io import read
from ase.data import atomic_numbers
p=argparse.ArgumentParser()
p.add_argument('input');p.add_argument('-o','--output',required=True)
a=p.parse_args();atoms=read(a.input)
if atoms.cell.volume < 1e-4: raise SystemExit('ERROR: no periodic cell. Supply a valid crystal cell before conversion.')
if len(atoms)==0: raise SystemExit('Empty structure')
syms=sorted(set(atoms.get_chemical_symbols()),key=lambda s: atomic_numbers[s]); mp={s:i+1 for i,s in enumerate(syms)}
cell=atoms.cell.array
lines=['NumberOfAtoms '+str(len(atoms)), 'NumberOfSpecies '+str(len(syms)),'%block ChemicalSpeciesLabel']
lines += [f'{mp[s]} {atomic_numbers[s]} {s}' for s in syms]
lines += ['%endblock ChemicalSpeciesLabel','LatticeConstant 1.0 Ang','%block LatticeVectors']
lines += [' '.join(f'{v:.12f}' for v in row) for row in cell]
lines += ['%endblock LatticeVectors','AtomicCoordinatesFormat Ang','%block AtomicCoordinatesAndAtomicSpecies']
for pos,sym in zip(atoms.positions,atoms.get_chemical_symbols()):
    lines.append(' '.join(f'{v:.12f}' for v in pos)+f' {mp[sym]} # {sym}')
lines += ['%endblock AtomicCoordinatesAndAtomicSpecies']
Path(a.output).write_text('\n'.join(lines)+'\n')
print(f'Created {a.output}: {len(atoms)} atoms; species {", ".join(syms)}')
