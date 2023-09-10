from keras.models import load_model
from sentence_transformers import SentenceTransformer
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import json
import pickle

df = pd.read_csv('/home/hesham/PRUM/backend/data/testing.csv', sep=',')
print(df.head())



def pattern():
    print('in pattern')

    diction = {}
    patt4 = []
    data = list(df['message'])

    things = ['Account Name', 'EventCode', 'TaskCategory', 'Message', 'Impersonation Level', 'Token Elevation Type',
              'Source Address', 'Source Port', 'Logon Type', 'OpCode', 'Type', 'Keywords', 'Subject ID', 'Object Type', 'Access Mask', 'Accesses', 'Share Name', 'Share Path', 'New Process Name', 'Process Name', 'Creator Process Name',
              'Process Command Line', 'Object Server', 'Access Reasons', 'Privileges Used for Access Check',
              'Resource Attributes', 'Enabled Privileges', 'Privileges', 'Relative Target Name', 'SYNCHRONIZE',
              'ReadAttributes', 'Logon Process Name', 'Group Name', 'Group Domain', 'Name',
              'Original Security Descriptor', 'New Security Descriptor', 'EventType', 'Image', 'TargetObject', 'User', 'ImageLoaded', 'Hashes', 'CommandLine', 'CurrentDirectory', 'ParentImage', 'ParentCommandLine', 'TargetFilename', 'QueryName', 'QueryStatus', 'type']
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


def sent_to_vec(sentence):
    print('in sbert')
    model = SentenceTransformer('paraphrase-multilingual-mpnet-base-v2')
    embeddings = model.encode(sentence)

    return embeddings


data_frame = pattern()

X_test = sent_to_vec(data_frame['msg'].values)

model = load_model('/home/hesham/PRUM/backend/malicious_log_model.h5')

pred = model.predict(X_test).round()
empty_df = pd.DataFrame(columns=['timestamp', 'message', 'winlog'])  # You can change column names as needed

anomalies = {'pattern': [], 'whole_log': []}
for index, row in data_frame.iterrows():
    if np.array_equal(pred[index], [1.]):
        whole_log = df.loc[index].to_dict()  # Replace 'column_name' with the actual column name you want to retrieve
        row_df = pd.DataFrame.from_dict(whole_log, orient='index').T
        empty_df = empty_df.append(row_df, ignore_index=True)
        anomalies['pattern'].append(row['msg'])
        anomalies['whole_log'].append(whole_log)

empty_df.to_csv('whole_logs_anomalies.csv')

anom = []

count = 0

for log in anomalies['whole_log']:
    count += 1
    anom_data = {}
    anom_data['id'] = count
    anom_data['timestamp'] = log['timestamp']
    winlog = eval(log['winlog'])
    anom_data['source'] = winlog['provider_name']
    anom_data['eventid'] = winlog['event_id']
    anom_data['level'] = winlog['opcode']
    anom_data['taskCategory'] = winlog['task']
    msg = log['message']
    msg = msg.split('.')
    anom_data['message'] = msg[0]

    anom.append(anom_data)

with open('showAnomalies.pkl', 'wb') as file:
    pickle.dump(anom, file)

