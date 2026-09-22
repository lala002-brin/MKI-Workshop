# Hartree-Fock Theory


## Introduction


Hartree-Fock theory is one of the earliest approaches developed to solve the electronic structure problem of many-electron systems.


The main challenge in quantum mechanical calculations is that electrons interact with each other through Coulomb forces. Therefore, solving the exact many-electron Schrödinger equation becomes computationally difficult.


Hartree-Fock introduces an approximation where each electron moves independently inside an average potential created by all other electrons.


This approach is known as the **mean-field approximation**.



---

## Independent Particle Approximation


For a system containing non-interacting electrons, the total wave function can be represented as a product of individual electron wave functions.


For a two-electron system:


\[
\Psi(r_1,r_2)=\phi_1(r_1)\phi_2(r_2)
\]


where:


- \(\phi_1(r_1)\) represents the state of electron 1
- \(\phi_2(r_2)\) represents the state of electron 2


However, real electrons are not independent particles because they interact through electrostatic repulsion.



---

## Electron-Electron Interaction


When electrons form a single quantum system, two important problems appear:


### 1. Electron interaction


The Coulomb interaction between electrons cannot be ignored.


### 2. Fermionic nature of electrons


Electrons are fermions and must obey the Pauli exclusion principle.


The wave function must be antisymmetric when two electrons are exchanged:


\[
\Psi(r_1,r_2)=-\Psi(r_2,r_1)
\]


A simple product wave function does not satisfy this requirement.



---

## Hartree Product Limitation


The Hartree product is written as:


\[
\Psi_{HP}(r_1,r_2,...,r_N)
=
\phi_1(r_1)\phi_2(r_2)...\phi_N(r_N)
\]


Although this expression describes multiple electrons, it does not satisfy the antisymmetry requirement of fermions.



---

## Antisymmetric Wave Function


To overcome this limitation, Hartree-Fock introduces spin orbitals:


\[
\chi(r)
\]


For a two-electron system, the wave function becomes:


\[
\Psi(r_1,r_2)
=
\frac{1}{\sqrt{2}}
[
\chi_1(r_1)\chi_2(r_2)
-
\chi_1(r_2)\chi_2(r_1)
]
\]


This equation ensures that exchanging two electrons changes the sign of the wave function.



---

## Slater Determinant


The antisymmetric wave function can be generalized using the Slater determinant.


For two electrons:


\[
\Psi(r_1,r_2)
=
\frac{1}{\sqrt{2}}
\begin{vmatrix}
\chi_1(r_1)&\chi_2(r_1)\\
\chi_1(r_2)&\chi_2(r_2)
\end{vmatrix}
\]


For a system containing \(N\) electrons:


\[
\Psi=
\frac{1}{\sqrt{N!}}
\begin{vmatrix}
\chi_1(r_1)&\chi_2(r_1)&...&\chi_N(r_1)\\
\chi_1(r_2)&\chi_2(r_2)&...&\chi_N(r_2)\\
\vdots&\vdots&\ddots&\vdots\\
\chi_1(r_N)&\chi_2(r_N)&...&\chi_N(r_N)
\end{vmatrix}
\]


The Slater determinant automatically satisfies the antisymmetry condition required for electrons.



---

## Mean-Field Interpretation


The Hartree-Fock approximation treats electrons as independent particles moving under an average potential.


The interaction between electrons is separated into:


- Coulomb interaction
- Exchange interaction


This approximation significantly reduces computational complexity compared with solving the exact many-body Schrödinger equation.



---

## Limitations of Hartree-Fock


Although Hartree-Fock provides an important foundation for electronic structure theory, it has several limitations:


- Electron correlation effects are not fully described.

- Computational cost increases rapidly with system size.

- Large material systems require more efficient approaches.


Because of these limitations, Density Functional Theory (DFT) became one of the most widely used methods in computational materials science.



---

## Next Step


Continue to:


**Density Functional Theory Overview**


to learn how DFT transforms the many-body problem into an electron density problem.
