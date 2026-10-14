from ase.io import read
atoms=read('structure.xyz')
print(len(atoms), atoms.get_chemical_formula())
