import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.cluster import DBSCAN
from sklearn.metrics import silhouette_score
import pandas as pd
import pickle
import json
import cupy as cp
import cudf
from cuml.cluster import DBSCAN
import subprocess

df = pd.read_csv('elasticsearch.csv')


def pattern():
    diction = {}
    patt4 = []
    data = list(df['message'])

    things = ['Account Name', 'EventCode', 'TaskCategory', 'Message', 'Impersonation Level', 'Token Elevation Type',
              'Source Address', 'Source Port', 'Logon Type', 'OpCode', 'Type', 'Keywords', 'Subject ID', 'Object Type',
              'Access Mask', 'Accesses', 'Share Name', 'Share Path', 'New Process Name', 'Process Name',
              'Creator Process Name',
              'Process Command Line', 'Object Server', 'Access Reasons', 'Privileges Used for Access Check',
              'Resource Attributes', 'Enabled Privileges', 'Privileges', 'Relative Target Name', 'SYNCHRONIZE',
              'ReadAttributes', 'Logon Process Name', 'Group Name', 'Group Domain', 'Name',
              'Original Security Descriptor', 'New Security Descriptor', 'EventType', 'Image', 'TargetObject', 'User',
              'ImageLoaded', 'Hashes', 'CommandLine', 'CurrentDirectory', 'ParentImage', 'ParentCommandLine',
              'TargetFilename', 'QueryName', 'QueryStatus', 'type']
    winlog = df['winlog'].values
    main_things = ['computer_name', 'keywords', 'process', 'logon', 'event_data', 'opcode', 'event_id', 'task']

    for count, patt in enumerate(data):
        winlogs = eval(winlog[count])

        if type(patt) is str:
            patt2 = patt.replace('\n', '|')
            patt2 = patt2.replace(':|\t', '|')
            patt2 = patt2.replace(':', '|')
            patt2 = patt2.replace('=', '|')
            patt2 = patt2.replace('\t', '')
            patt3 = patt2.split('|')
            msg = patt3[0]

            for j in things:
                if j in patt3:
                    index = patt3.index(j) + 1
                    if j == 'Image':
                        msg = msg + ' ' + patt3[index + 1]
                    else:
                        msg = msg + ' ' + patt3[index]

            for i in main_things:
                if i in winlogs and type(winlogs[i]) is not dict and type(winlogs[i]) is not list:
                    msg = msg + ' ' + winlogs[i]
                elif i in winlogs and type(winlogs[i]) is list:
                    msg = msg + ' ' + winlogs[i][0]
            patt4.append(msg)

    diction['msg'] = patt4
    dataframe = pd.DataFrame(diction)
    return dataframe


def sent_to_vec(data):
    print('sbert')
    sentence = list(data['msg'])
    model = SentenceTransformer('paraphrase-multilingual-mpnet-base-v2')
    embeddings = model.encode(sentence)
    embed = []

    for emb in embeddings:
        embed.append(np.array(emb))

    return embed


def dbscan(data2, data):
    print('in dbscan')
    data2_gpu = cp.asarray(data2)

# Create a GPU DataFrame using cudf
    data2_df = cudf.DataFrame({f'feature_{i}': data2_gpu[:, i] for i in range(data2_gpu.shape[1])})

    # Initialize the DBSCAN model on GPU
    model = DBSCAN(eps=0.1, min_samples=8)

    # Fit the model and get the prediction
    pred = model.fit_predict(data2_df)

    # Transfer the predictions back to the CPU
    pred_cpu = cp.asnumpy(pred)

    # Extract the negative outputs as outliers using NumPy
    anom_index = np.where(pred_cpu == -1)
    anom = anom_index[0].tolist()
    print(anom)

    abc = []

    for index, row in data.iterrows():
        if index in anom:
            abc.append(row['msg'])

    dictionary_sir = {'anomalies': abc}

    data = pd.DataFrame(dictionary_sir)
    return data


def read_column(data, column_name):
    column_values = data[column_name].tolist()

    return column_values


def labelling(data_anomalies):
    dictionary_supervised = {}
    log = []
    anomaly = []

    for non_anomalies in data_non_anom:
        if non_anomalies in data_anomalies:
            log.append(non_anomalies)
            anomaly.append('Anomaly')
            dictionary_supervised['log'] = log
            dictionary_supervised['anomaly'] = anomaly
        else:
            log.append(non_anomalies)
            anomaly.append('Normal')
            dictionary_supervised['log'] = log
            dictionary_supervised['anomaly'] = anomaly

    print(dictionary_supervised['anomaly'].count('Anomaly'))

    data_supervised_pattern = pd.DataFrame(dictionary_supervised)
    data_supervised_pattern.to_csv('data_supervised.csv')


data_frame = pattern()
embed = cp.asnumpy(sent_to_vec(data_frame))
'''with open('sent_to_vec_elasticsearch_windows.pkl', 'wb') as file:
    pickle.dump(embed, file)'''
'''with open('sent_to_vec_elasticsearch_windows.pkl', 'rb') as file:
    embed = pickle.load(file)'''
dataanom = dbscan(embed, data_frame)
data_non_anom = read_column(data_frame, 'msg')

data_anom = read_column(dataanom, 'anomalies')
print(dataanom)
labelling(data_anom)
subprocess.run(['python3', '/home/hesham/PRUM/lstm/lstm_supervised_training.py'])

