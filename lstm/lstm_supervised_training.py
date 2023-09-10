import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
import tensorflow as tf


def sent_to_vec(sentence):
    model = SentenceTransformer('paraphrase-multilingual-mpnet-base-v2')
    embeddings = model.encode(sentence)

    return embeddings


df = pd.read_csv('data_supervised.csv', sep=',')
print(df.head())

X = df['log']
X_train = X[0:int(X.shape[0]*.6)]
X_val = X[int(X.shape[0]*.6):int(X.shape[0]*.75)]
X_test = X[int(X.shape[0]*.75):]

X_train = sent_to_vec(X_train.values)
X_val = sent_to_vec(X_val.values)
X_test = sent_to_vec(X_test.values)

y = df['anomaly']
y_train = y[0:int(y.shape[0]*.6)]
y_val = y[int(y.shape[0]*.6):int(y.shape[0]*.75)]
y_test = y[int(y.shape[0]*.75):]

print(y_train.value_counts())

Normal = 0
Anomaly = 1

y_train = np.array(list(map(lambda x: Normal if x == 'Normal' else Anomaly, y_train)))
y_val = np.array(list(map(lambda x: Normal if x == 'Normal' else Anomaly, y_val)))
y_test = np.array(list(map(lambda x: Normal if x == 'Normal' else Anomaly, y_test)))

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(X_test.shape[1],)),
    tf.keras.layers.Dense(256, activation='relu'),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(loss='binary_crossentropy',
              optimizer=tf.keras.optimizers.Adam(2e-5),
              metrics=['accuracy'])

history = model.fit(x=X_train, y=y_train, epochs=500,
                    validation_data=(X_val, y_val),
                    shuffle=True,
                    validation_steps=30)
model.save("malicious_log_model.h5")

