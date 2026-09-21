# Graphite (001) Surface Generation


## Overview

This section explains the process of generating a graphite surface model from a bulk crystal structure.

In battery simulation, electrode surfaces are required to study the interaction between the electrode and electrolyte.

The workflow converts a periodic graphite bulk structure into a finite surface slab model suitable for interface simulation.


The general workflow:

```
Graphite Bulk Crystal

↓

Surface Orientation Selection

↓

Slab Generation

↓

Vacuum Addition

↓

Surface Relaxation

↓

Graphite-Electrolyte Interface
```


---

# Why Graphite (001) Surface?


Graphite is one of the most commonly used anode materials in lithium-ion batteries.

The graphite surface interacts directly with electrolyte molecules and lithium ions during battery operation.


The (001) surface represents the basal plane of graphite:

```
Graphite Layers

================

(001) Surface

================

Graphite Layers
```


This surface is important for studying:

- Lithium adsorption
- Electrolyte interaction
- Interfacial structure
- Ion distribution near the electrode


---

# Starting Structure


The initial structure is:

```
graphite_bulk.cif
```


The CIF file contains:

- Crystal lattice parameters
- Atomic positions
- Symmetry information


Workflow:

```
graphite_bulk.cif

↓

Crystal Structure

↓

Surface Model
```


---

# Surface Generation Concept


A surface slab is created by cutting the bulk crystal along a selected crystallographic direction.


For graphite:

```
Bulk Graphite

↓

Cut along (001)

↓

Graphite Slab
```


The generated slab contains:

- Several graphene layers
- Periodic surface area
- Exposed carbon atoms


---

# Slab Thickness


The slab thickness must represent bulk-like behavior.


Important parameters:


## Number of Layers

More layers provide:

- Better bulk representation
- Higher computational cost


Typical choice:

```
4 - 8 graphene layers
```


---

## Vacuum Region


A vacuum layer is added perpendicular to the surface.


Purpose:

```
Periodic Boundary

↓

Avoid Interaction Between Neighboring Surfaces
```


Typical vacuum thickness:

```
15 - 20 Å
```


---

# Surface Optimization


Before adding electrolyte molecules, the graphite surface should be optimized.


Optimization includes:

- Atomic position relaxation
- Surface energy minimization


Goal:

```
Stable Graphite Surface Structure
```


---

# Surface Construction Workflow


## Step 1

Prepare bulk graphite:

```
graphite_bulk.cif
```


## Step 2

Generate surface:

```
Bulk Crystal

↓

Graphite (001) Slab
```


Output:

```
graphite_001_surface.xyz
```


## Step 3

Validate structure.


Check:

- Carbon arrangement
- Layer spacing
- Surface termination


Recommended tools:

- VESTA
- OVITO


## Step 4

Prepare interface.


Combine:

```
Graphite (001)

+

LiTFSI / EMIM-TFSI electrolyte

↓

Electrode-Electrolyte Interface
```


---

# Computational Considerations


Important factors:


## Periodic Boundary Condition

The surface model usually applies:

```
Periodic in x-y direction

Vacuum in z direction
```


## Cell Size

The surface area must be large enough to:

- Avoid artificial interaction
- Accommodate electrolyte molecules


## Charge Consideration

Electrode-electrolyte systems require careful consideration of charge neutrality and electrostatic effects.


---

# Connection to Workshop Workflow


The generated graphite surface becomes the electrode model for:

```
02_SYSTEM_DESIGN

↓

Interface_Building

↓

03_QUANTUM_SIMULATION

↓

04_ATOMISTIC_SIMULATION
```


---

# Expected Output


After completing this step, participants obtain:

```
graphite_001_surface.xyz
```


containing:

- Graphite surface atomic coordinates
- Electrode model
- Starting structure for interface construction


---

# Next Step


The next stage is:

```
Graphite Surface

+

LiTFSI-EMIM-TFSI Electrolyte

↓

Graphite-Electrolyte Interface Construction
```


This interface model will be used to investigate electrode-electrolyte interactions and lithium transport behavior.
