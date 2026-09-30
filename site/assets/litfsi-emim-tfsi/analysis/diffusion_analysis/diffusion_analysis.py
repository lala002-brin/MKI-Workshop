# Diffusion Coefficient Calculation
# Einstein Relation


def calculate_diffusion(msd, time):

    diffusion = msd / (6 * time)

    return diffusion


# Example

msd_value = 10.0

time = 100.0


D = calculate_diffusion(msd_value, time)


print("Diffusion coefficient =", D)
