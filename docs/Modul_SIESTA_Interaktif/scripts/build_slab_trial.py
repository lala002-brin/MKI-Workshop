#!/usr/bin/env python3
"""Illustrative ASE slab builder; validate termination and polarity manually."""
import argparse
from ase.io import read,write
from ase.build import surface
p=argparse.ArgumentParser();p.add_argument('structure');p.add_argument('--hkl',nargs=3,type=int,required=True)
p.add_argument('--layers',type=int,default=6);p.add_argument('--vacuum',type=float,default=18)
p.add_argument('--repeat',nargs=2,type=int,default=[2,2]);p.add_argument('-o','--output',required=True)
a=p.parse_args();atoms=read(a.structure)
slab=surface(atoms,tuple(a.hkl),a.layers,vacuum=a.vacuum)
slab=slab.repeat((a.repeat[0],a.repeat[1],1));slab.pbc=True
write(a.output,slab,format='vasp',direct=False,sort=True)
print('TRIAL ONLY: check chemistry, stoichiometry, surface termination, dipole, and strain.')
