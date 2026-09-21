# Machine Learning Potential


## Overview

Machine Learning Potential (MLP) is a computational approach that combines machine learning algorithms with atomistic simulation to predict atomic interactions efficiently.

Traditional first-principles calculations such as Density Functional Theory (DFT) provide high accuracy but are limited by computational cost when studying large systems or long simulation times.

Machine learning potential addresses this limitation by learning the relationship between:

```
Atomic Structure

↓

Energy and Force

↓

Material Behavior
```

The main scientific question addressed by machine learning potential is:


```
How can accurate atomic simulations be performed for larger systems with lower computational cost?
```


---

# Why Machine Learning Potential is Needed


Computational materials simulations face a balance between accuracy and efficiency.


## First-Principles Calculation


Advantages:

- High accuracy
- Detailed electronic information


Limitations:

- High computational cost
- Limited system size
- Short simulation time


---

## Classical Molecular Dynamics


Advantages:

- Large system capability
- Long simulation time


Limitations:

- Requires predefined interaction parameters
- Lower accuracy for complex systems


---

## Machine Learning Potential


Machine learning potential provides a bridge between accuracy and computational efficiency.


Workflow:


```
High Accuracy Data

(DFT Calculation)

↓

Machine Learning Model

↓

Fast Atomic Simulation
```


---

# Basic Concept of Machine Learning Potential


Machine learning potential learns the relationship between atomic configurations and their corresponding properties.


The learning process:


```
Atomic Structure

↓

Reference Energy and Forces

↓

Machine Learning Training

↓

Predictive Potential
```


After training, the model can predict:


- Atomic energy
- Atomic forces
- System behavior


---

# Dataset Generation


A reliable machine learning potential requires high-quality training data.


Typical dataset components:


## Atomic Structures

Examples:

- Different molecular configurations
- Various atomic arrangements
- Different simulation conditions


## Energy Information

Obtained from accurate computational methods such as DFT.


## Atomic Forces

Describe how atoms interact and move.


The dataset connects:


```
Atomic Configuration

+

Energy

+

Force

↓

Training Data
```


---

# Machine Learning Potential Workflow


A typical workflow consists of:


```
Reference Calculation

↓

Dataset Preparation

↓

Model Training

↓

Model Validation

↓

Large-Scale Simulation
```


Each stage is important to ensure reliable predictions.


---

# MACE Machine Learning Potential


In this workshop, the machine learning potential framework used is:


```
MACE

Machine Learning Atomic Cluster Expansion
```


MACE is designed to represent atomic interactions using machine learning models while maintaining high accuracy and efficiency.


---

# Advantages of MACE


## High Accuracy

MACE can achieve accuracy close to reference quantum calculations when trained with suitable datasets.


## Efficient Simulation

The trained model can perform simulations faster than direct quantum calculations.


## Large-Scale Applications

MACE enables simulation of:

- Larger atomic systems
- Longer simulation times
- More complex materials


---

# Machine Learning Potential for Ionic Liquid Battery Systems


For ionic liquid electrolytes, machine learning potential can help investigate:


## Lithium Ion Transport


Understanding lithium movement in complex electrolyte environments.


## Large-Scale Molecular Dynamics


Simulating systems beyond the practical limit of direct DFT calculations.


## Long-Time Behavior


Studying transport phenomena that require longer simulation times.


---

# Relationship Between DFT, MD, and MLP


Machine learning potential does not replace first-principles calculations.

Instead, it uses high-quality quantum data to create efficient predictive models.


The relationship:


```
DFT

↓

Generate Accurate Data

↓

Train Machine Learning Potential

↓

Accelerated Molecular Dynamics

↓

Large-Scale Material Simulation
```


---

# Machine Learning Validation


Before using a trained model, validation is required.


Important validation parameters:


## Energy Accuracy

Comparison between predicted and reference energies.


## Force Accuracy

Comparison between predicted and reference atomic forces.


## Structural Stability

Evaluation of whether the model maintains realistic atomic behavior.


---

# Role of Machine Learning Potential in Workshop Workflow


In this workshop, machine learning potential is used to accelerate ionic liquid battery simulations.


The workflow:


```
Quantum ESPRESSO

↓

Reference Dataset

↓

MACE Training

↓

Large Scale Molecular Dynamics

↓

Ion Transport Prediction
```


---

# Connection to Workshop Modules


The concepts introduced here are implemented in:


```
05_AI_ACCELERATION/
```


Including:

- Dataset preparation
- Model training
- Validation
- Large-scale molecular dynamics


Machine learning potential provides the final acceleration stage in the multiscale computational workflow.
