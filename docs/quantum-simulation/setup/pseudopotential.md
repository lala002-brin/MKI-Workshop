# Pseudopotential


## Introduction


In Quantum ESPRESSO, pseudopotential replaces the actual electron-ion interaction.


The pseudopotential describes the atomic nucleus and all electrons except the outermost valence electrons.


The rapidly changing potential field near the atomic core is replaced by a smoother function that reproduces the potential behavior away from the core.


This approximation reduces the number of plane wave basis functions required for wavefunction expansion and makes first-principles calculations computationally more efficient.



---

## Role of Pseudopotential


In electronic structure calculations, core electrons usually do not directly participate in chemical bonding.


Therefore, pseudopotentials are used to simplify the interaction between atomic nuclei and valence electrons.


By applying the rigid core approximation, the nucleus and core electrons are represented by an effective potential that interacts with valence electrons.



---

## Choosing Pseudopotentials


Quantum ESPRESSO provides several pseudopotential libraries.


The choice of pseudopotential depends on the research problem and material system.


For example, heavy elements that require spin-orbit coupling calculations need fully relativistic pseudopotentials.


The selected pseudopotential should accurately reproduce the physical properties of the material being studied.



---

## Pseudopotential Libraries


Several commonly used pseudopotential libraries include:


- [Quantum ESPRESSO Pseudopotential Library](https://www.quantum-espresso.org/pseudopotentials)

- [Standard Solid State Pseudopotentials (SSSP)](https://www.materialscloud.org/discover/sssp/table/efficiency)

- [GBRV Pseudopotential Library](https://www.physics.rutgers.edu/gbrv/)

- [PseudoDojo](http://www.pseudo-dojo.org/)

- [PSLibrary](https://dalcorso.github.io/pslibrary/)


---

## Pseudopotential Naming Convention


An example pseudopotential filename in PSLibrary:


    O.rel-pbe-n-rrkjus_psl.1.0.0.UPF


The filename contains information about the atomic species, relativistic treatment, exchange correlation functional, core correction, and pseudopotential type.



### Filename Interpretation


| Identifier | Meaning |
|-----------|---------|
| O | Atomic species |
| rel | Full relativistic pseudopotential |
| pbe | Exchange correlation functional |
| n | Non-linear core correction |
| rrkjus | Ultrasoft pseudopotential type |



---

## Exchange Correlation Functionals


Common exchange correlation functionals used in pseudopotentials:


| Identifier | Functional |
|-----------|------------|
| pz | Perdew-Zunger (LDA) |
| pbe | Perdew-Burke-Ernzerhof (GGA) |
| pw91 | Perdew-Wang 91 (GGA) |
| blyp | Becke-Lee-Yang-Parr (GGA) |



---

## Pseudopotential Types


Different pseudopotential types are available depending on accuracy and computational efficiency.


| Identifier | PP Type |
|-----------|---------|
| ae | All-electron |
| rrkj | Norm conserving |
| rrkjus | Ultrasoft |
| kjpaw | Projector Augmented Wave (PAW) |



---

## Norm Conserving vs Ultrasoft vs PAW


Ultrasoft pseudopotentials are computationally more efficient compared with norm conserving pseudopotentials.


The recommended plane wave cutoff energy (`ecutwfc`) is usually provided in the header of each pseudopotential file.


For ultrasoft pseudopotentials, the charge density cutoff (`ecutrho`) is commonly set approximately eight times the value of `ecutwfc`.


For norm conserving pseudopotentials, the default value of four times `ecutwfc` is commonly used.


The convergence of total energy should always be tested against the cutoff energy for each material system.



---

## Important Notes


- Different pseudopotential types such as norm conserving, ultrasoft, and PAW can be mixed in one calculation.

- Different exchange correlation functionals should not be mixed, such as PBE and LDA.

- The exchange correlation functional can be obtained from the pseudopotential file or specified using the `input_dft` parameter in Quantum ESPRESSO.

- PBE-sol is commonly used for solid systems, while PBE is generally used for molecular systems.



---

## Common Error


Mixing incompatible exchange correlation functionals may produce an error:


    conflicting values for igcx


This problem can be solved by ensuring consistent exchange correlation functionals or by explicitly defining the desired functional using the `input_dft` parameter.



---

## Resources


Useful pseudopotential resources:


- [Quantum ESPRESSO Pseudopotentials](https://www.quantum-espresso.org/pseudopotentials)

- [Materials Cloud SSSP Library](https://www.materialscloud.org/discover/sssp/table/efficiency)

- [PseudoDojo](http://www.pseudo-dojo.org/)

- [GBRV Pseudopotential Library](https://www.physics.rutgers.edu/gbrv/)

- [PSLibrary](https://dalcorso.github.io/pslibrary/)

---

## Next Step


Continue to:


**Density Functional Theory**


to learn the theoretical foundation behind first-principles calculations.
