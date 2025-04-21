import pandas as pd
import numpy as np
from sklearn.naive_bayes import GaussianNB
from imblearn.over_sampling import SMOTE

print("Pandas:", pd.__version__)
print("NumPy:", np.__version__)
print("Scikit-learn:", GaussianNB.__module__)
print("Imbalanced-learn:", SMOTE.__module__)

