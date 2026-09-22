# Introduction to Density Functional Theory


Density Functional Theory (DFT) is one of the most successful approaches in computational materials science for studying the electronic structure of atoms, molecules, and solid materials.


The main idea of DFT is to describe a many-electron system using the electron density instead of solving the complete many-electron wave function.


The electronic wave function contains information about the complete quantum state of a system. However, solving the wave function directly becomes computationally impossible for realistic materials containing a large number of electrons.



!!! info "Wave Function and Electron Density"

    In conventional quantum mechanics, a system is described by a many-electron wave function:

    \[
    \Psi(r_1,r_2,...,r_N)
    \]

    where \(N\) represents the number of electrons.

    The electron density is defined as:

    \[
    n(r)
    \]

    which describes the probability of finding electrons at a specific position.



## From Many-Body Problem to Electron Density


The Schrödinger equation provides the fundamental description of quantum systems.


For a many-electron system, the Hamiltonian contains kinetic energy, electron-nucleus interaction, and electron-electron interaction terms:


\[
\hat{H}\Psi = E\Psi
\]


However, the wave function depends on \(3N\) spatial coordinates, making direct calculations extremely expensive.


DFT solves this problem by using electron density as the main variable. The electron density only depends on three spatial coordinates:


\[
n(r)
\]


This transformation reduces the complexity of the electronic structure problem.



## What is a Functional?


The concept of a functional is central to DFT.


A normal function takes a variable as input and produces a value as output:


\[
y=f(x)
\]


A functional takes another function as input and produces a value:


\[
y=F[f(x)]
\]


In DFT, the electron density \(n(r)\) is the input, while the total energy is the output:


\[
E[n]
\]


Therefore, the total energy is called an energy functional.



!!! tip "Main Idea of DFT"

    Instead of solving:

    \[
    \Psi(r_1,r_2,...,r_N)
    \]

    DFT solves:

    \[
    n(r)
    \]

    to obtain the ground-state properties of materials.



## Hohenberg-Kohn Theorem


The theoretical foundation of DFT was established by Hohenberg and Kohn in 1964.


The two Hohenberg-Kohn theorems demonstrate that the electron density contains all information required to describe the ground-state properties of a system.



## Hohenberg-Kohn Theorem 1


The first theorem states that the ground-state electron density uniquely determines the external potential of the system.


In other words, if the electron density is known, the external potential and all ground-state properties can be determined.


\[
n(r) \rightarrow V_{ext}(r)
\]


This means the electron density contains the same information as the many-electron wave function for describing ground-state properties.



## Hohenberg-Kohn Theorem 2


The second theorem introduces the variational principle.


The correct ground-state electron density minimizes the total energy functional:


\[
E[n] \geq E[n_0]
\]


where \(n_0\) represents the true ground-state electron density.


Therefore, finding the ground state becomes an energy minimization problem.



## Self-Consistent Field (SCF) Cycle


The purpose of the SCF cycle is to obtain a stable electron density that minimizes the total energy of the system.


In a DFT calculation, the electron density is not known initially. Therefore, the calculation starts with an initial density estimation and improves it through repeated iterations.


!!! info "Self-Consistent Field (SCF) Cycle"

    The electron density is updated continuously until the calculated energy and density satisfy the convergence criteria.


The general workflow of the SCF calculation is:


1. **Initial Atomic Structure**

    The calculation begins with the atomic positions and crystal structure of the material.


2. **Initial Electron Density**

    An initial approximation of the electron density is generated from the atomic configuration.


3. **Solve Electronic Structure Equation**

    The Kohn-Sham equations are solved to obtain the electronic states of the system.


4. **Update Electron Density**

    The electron density is recalculated based on the obtained electronic states.


5. **Convergence Check**

    The new electron density and total energy are compared with the previous iteration.


6. **Ground-State Properties**

    After convergence is achieved, the final electronic structure is used to calculate material properties.


The SCF process can be summarized as:


\[
\rho_{initial}(r)
\rightarrow
\text{Kohn-Sham Solver}
\rightarrow
\rho_{updated}(r)
\rightarrow
\text{Convergence}
\]


The iteration continues until the difference between two consecutive electron densities becomes smaller than the convergence threshold.
## Why DFT is Important?


DFT has become a standard method in computational materials research because it provides a balance between accuracy and computational efficiency.


DFT calculations are widely applied for:


- Electronic structure analysis

- Band structure calculations

- Surface and interface studies

- Battery material investigation

- Catalysis research

- Materials discovery



## Limitations of DFT


Although DFT is highly successful, several challenges remain.


The accuracy of DFT depends strongly on the selected exchange-correlation functional.


Some strongly correlated materials require more advanced computational methods beyond standard DFT.

---


## Resources


Further reading and learning materials:


- [MIT OpenCourseWare: Atomistic Computer Modeling of Materials](https://ocw.mit.edu/courses/materials-science-and-engineering/3-320-atomistic-computer-modeling-of-materials-sma-5107-spring-2005/video-lectures/)

- [Quantum ESPRESSO Tutorials](https://www.quantum-espresso.org/resources/tutorials)

- [Introduction to Density Functional Theory by Paolo Giannozzi](https://www.youtube.com/watch?v=1AH2pkijDPg&list=PLYc-eBoIpXTIboem6dKTYD1-1m0sMYnYz&index=1)

- [Computational Materials Physics](http://compmatphys.epotentia.com)


---

## Next Step

Continue to:


**Kohn-Sham Equation**


to understand how DFT transforms the interacting electron system into an equivalent non-interacting system.

