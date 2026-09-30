# Mean Square Displacement (MSD) Analysis
# LiTFSI-EMIM TFSI Electrolyte System


import numpy as np


def calculate_msd(trajectory):

    initial_position = trajectory[0]

    displacement = trajectory - initial_position

    msd = np.mean(np.sum(displacement**2, axis=1))

    return msd


# Example usage

positions = np.array([
    [0.0, 0.0, 0.0],
    [0.1, 0.05, 0.02],
    [0.2, 0.10, 0.04]
])


msd_value = calculate_msd(positions)

print("MSD =", msd_value)
