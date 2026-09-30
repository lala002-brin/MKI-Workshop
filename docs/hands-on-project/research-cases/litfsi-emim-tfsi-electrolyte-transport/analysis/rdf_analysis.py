# Radial Distribution Function (RDF) Analysis
# LiTFSI-EMIM TFSI Electrolyte System


import numpy as np


def calculate_distance(atom1, atom2):

    distance = np.linalg.norm(atom1 - atom2)

    return distance


# Example atomic coordinates

Li = np.array([0.0, 0.0, 0.0])

TFSI = np.array([2.0, 0.0, 0.0])


distance = calculate_distance(Li, TFSI)


print("Li-TFSI distance =", distance)
