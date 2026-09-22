# Wannier Basis


## Introduction


Wannier functions provide an alternative representation of electronic states in solids.


In conventional band structure calculations, electrons are described using **Bloch states**, which are delocalized across the entire crystal lattice.


Wannier functions transform these extended Bloch states into localized orbitals centered around atomic sites.


This localized representation is particularly useful for:


- Tight-binding models
- Electronic transport calculations
- Machine learning potentials
- Material property analysis



---

## Bloch States


In periodic materials, electronic states are described by Bloch functions according to Bloch's theorem.


The Bloch state is an eigenstate of the single-particle Hamiltonian:


\[
H|k\rangle=\epsilon_k|k\rangle
\]


where:


- \(H\) represents the Hamiltonian operator
- \(|k\rangle\) represents the Bloch state
- \(\epsilon_k\) represents the corresponding energy eigenvalue


The wave function representation is:


\[
\langle x|k\rangle=\psi_k(x)
\]


For a lattice with periodicity \(a\), Bloch's theorem gives:


\[
\psi_k(x+a)=e^{ika}\psi_k(x)
\]


This equation shows that Bloch states extend throughout the periodic crystal.



---

## From Bloch States to Wannier Functions


Although Bloch states are useful for describing band structures, they are delocalized.


Wannier functions provide a localized representation by transforming Bloch states into a basis labeled by lattice position instead of wave vector.


The Wannier basis can be written as:


\[
|n\rangle
\]


where \(n\) represents the lattice site index.


The relationship between Bloch states and Wannier states is:


\[
|k\rangle=
\frac{1}{\sqrt{N}}
\sum_n e^{ikna}|n\rangle
\]


where:


- \(N\) is the number of lattice sites
- \(a\) is the lattice constant
- \(n\) represents the position index



---

## Wannier Function Representation


The spatial representation of a Bloch state can be expressed using Wannier functions:


\[
\psi_k(x)=
\sum_n a_{nk}w(x-na)
\]


where:


- \(w(x-na)\) represents the Wannier function
- \(a_{nk}\) represents the transformation coefficient


Unlike Bloch states, Wannier functions are localized around specific atomic positions.



---

## Hamiltonian in Wannier Representation


Using the Wannier basis, the Hamiltonian can be expressed as:


\[
H=
\sum_n \epsilon_n |n\rangle\langle n|
+
\sum_{m\neq n}
(-t_{mn})|m\rangle\langle n|
\]


where:


- \(\epsilon_n\) represents the onsite energy
- \(t_{mn}\) represents the hopping parameter between sites


This representation forms the basis of tight-binding models.


The onsite term describes the energy of an electron localized at a site, while the hopping term describes electron movement between neighboring sites.



---

## Maximally Localized Wannier Functions


Wannier functions are not uniquely defined.


Different Wannier representations can be generated through unitary transformations of Bloch states.


A commonly used approach is the **Maximally Localized Wannier Function (MLWF)**.


MLWFs are obtained by choosing the transformation that minimizes the spatial spread of the Wannier orbitals.


These functions provide a localized description similar to molecular orbitals but extended to periodic solid systems.



---

## Applications of Wannier Functions


Wannier functions are widely used for:


- Building tight-binding Hamiltonians

- Studying electron transport

- Interpreting chemical bonding

- Calculating topological properties

- Modeling large-scale materials systems



---

## Resources


Further reading:


- [Introduction to Wannier Basis lecture by Vijay A. Singh](https://youtu.be/_XWIwoE7Pc4)


- [Maximally localized generalized Wannier functions for composite energy bands, Marzari and Vanderbilt (1997)](https://doi.org/10.1103/PhysRevB.56.12847)


- [Maximally localized Wannier functions for entangled energy bands, Souza, Marzari and Vanderbilt (2001)](https://doi.org/10.1103/PhysRevB.65.035109)


- [Maximally localized Wannier functions: Theory and applications, Marzari et al. (2012)](https://doi.org/10.1103/RevModPhys.84.1419)


- [Introduction to Maximally Localized Wannier Functions, Ambrosetti and Silvestrelli (2016)](https://doi.org/10.1002/9781119148739.ch6)
