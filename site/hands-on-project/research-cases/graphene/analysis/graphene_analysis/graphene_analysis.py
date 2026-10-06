# 🧪 Graphene Electronic Structure Analysis

import numpy as np
import matplotlib.pyplot as plt


print("Graphene analysis environment ready")


# ======================================
# Density of States (DOS) Analysis
# ======================================

dos = np.loadtxt(
    "../output/graphene_dos.dat"
)


energy = dos[:, 0]
density = dos[:, 1]


plt.figure(figsize=(6,4))

plt.plot(
    energy,
    density
)


plt.xlabel("Energy (eV)")
plt.ylabel("DOS")

plt.title(
    "Graphene Density of States"
)


plt.grid()

plt.show()
