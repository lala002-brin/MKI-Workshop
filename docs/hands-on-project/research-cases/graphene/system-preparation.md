# 🧱 System Preparation


Before running the electronic structure calculation,
prepare the graphene input files and directory structure.


## Input Files


The calculation requires the following files:


| File | Purpose |
|---|---|
| graphene_scf.in | SCF calculation |
| graphene_nscf.in | NSCF calculation |
| graphene_dos.in | DOS calculation |
| graphene_bands.in | Band structure calculation |


## Directory Structure


```text
graphene/

├── input/

│   ├── graphene_scf.in

│   ├── graphene_nscf.in

│   ├── graphene_dos.in

│   └── graphene_bands.in


├── scripts/

└── output/
```


## Important Parameters


The input files define:

| Parameter | Description |
|---|---|
| Atomic structure | Graphene geometry |
| K-point sampling | Brillouin zone sampling |
| Energy cutoff | Plane-wave basis accuracy |
| Calculation type | SCF, NSCF, DOS, Band |


After preparing the input files,
continue to the SCF calculation.
