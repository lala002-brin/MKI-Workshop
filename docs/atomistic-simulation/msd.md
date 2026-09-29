# Mean Square Displacement (MSD)


## Overview

Mean Square Displacement (MSD) is an analysis method used to quantify the movement of atoms or molecules during molecular dynamics simulation.

MSD measures the average distance that particles move from their initial positions over simulation time.

It is commonly used to evaluate atomic mobility and diffusion behavior.


## Role of MSD in Transport Analysis

Molecular dynamics generates atomic trajectories containing particle positions at different time steps.

MSD analyzes these trajectories to determine how actively atoms or molecules move.

The general workflow is:

```mermaid
flowchart LR

A[MD Trajectory]
-->B[Position Tracking]

B
-->C[MSD Calculation]

C
-->D[Diffusion Analysis]
```
## MSD Concept

MSD describes the average squared displacement of particles relative to their initial positions.

The calculation is based on the displacement of particles during simulation time.

For a diffusing particle, MSD generally increases with simulation time.


## Einstein Relation

The diffusion coefficient can be obtained from the slope of the MSD curve.

For three-dimensional systems:

$$
MSD(t)=6Dt
$$

where:

- MSD(t) is the mean square displacement at time t
- D is the diffusion coefficient
- t is simulation time


## Interpretation of MSD Curve

The MSD curve provides information about particle mobility.

Common interpretations:

- Low MSD increase indicates limited movement
- High MSD increase indicates higher mobility
- Linear MSD region represents diffusive behavior


## Applications

MSD analysis is commonly used for:

- Ion transport studies
- Electrolyte diffusion
- Molecular mobility analysis
- Interface transport behavior
