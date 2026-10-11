#!/usr/bin/env python3
"""Simple placement of TC above slab. Not a global adsorption search."""
import argparse
import numpy as np
from ase.io import read,write
p=argparse.ArgumentParser();p.add_argument('slab');p.add_argument('tc');p.add_argument('--height',type=float,default=3.)
p.add_argument('-o','--output',required=True);a=p.parse_args()
slab=read(a.slab);tc=read(a.tc);tc.positions-=tc.get_center_of_mass()
xy=np.mean(slab.cell.array[:2],axis=0)[:2]
tc.positions[:,0]+=xy[0];tc.positions[:,1]+=xy[1]
tc.positions[:,2]+=float(slab.positions[:,2].max()-tc.positions[:,2].min()+a.height)
combined=slab+tc;combined.cell=slab.cell;combined.pbc=slab.pbc
write(a.output,combined,format='vasp',sort=False)
print('TRIAL ONLY: rotate TC, sample sites, check collisions and periodic images.')
