# Computational Complexity

## Theoretical Scaling of DFT Calculations

The computational cost of Density Functional Theory (DFT) calculations depends on several parameters, including the number of atoms, k-points, plane waves, and electronic bands.

## Number of Atoms

The computational time increases approximately as:

\[
O(N^3)
\]

where **N** represents the number of atoms in the system.

Larger systems require significantly higher computational resources because the electronic structure problem becomes more complex.

---

## Number of k-points

The computational cost is proportional to the number of inequivalent k-points:

\[
O(N_k)
\]

A denser k-point mesh improves accuracy but increases computational cost.

---

## Number of Plane Waves

The number of plane waves depends on the kinetic energy cutoff:

\[
N_{PW} \propto E_{cut}^{3/2}
\]

The FFT operations scale approximately as:

\[
O(N \log N)
\]

---

## Subspace Diagonalization

The diagonalization step scales approximately as:

\[
O(N^3)
\]

with respect to the number of electronic bands.

---

## Summary

| Parameter | Scaling |
| --- | --- |
| Number of atoms | O(N³) |
| Number of k-points | O(Nk) |
| Number of plane waves | O(N log N) |
| Subspace diagonalization | O(N³) |
