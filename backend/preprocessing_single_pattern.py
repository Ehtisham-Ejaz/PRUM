import sys
import json
from pymodm import connect
from sentence_transformers import SentenceTransformer
import torch
import pandas as pd
from sklearn.cluster import DBSCAN
from numpy import where
import numpy as np
from scipy.spatial.distance import pdist
from scipy.cluster.hierarchy import linkage
from kneed import KneeLocator
from model_data_schema import ModelData

'''def read_file():
    #data = sys.argv[1]
    data = 'we1775srv$'
    df = pd.read_csv(data + '.csv')
    return df'''


def file_read_pattern(data):
    data = sys.argv[1]
    # data = 'we1775srv$'
    df = pd.read_csv(data + '.csv')
    data1 = list(df['message'])
    return data1


def pattern_parder():
    # df = pd.DataFrame(columns=['msg'])
    #user = ['we1775srv$']
    user = [sys.argv[1]]

    for i in user:

        diction = {}
        data = file_read_pattern(i)
        patt4 = []

        '''if i == 'malicious_logs1':

            with open('Logs-Data.json', 'r') as f:
                data_json = json.load(f)

            data_1 = ['RenderedDescription', 'file_description', 'process_path', 'UserName', 'file_directory', 'process_integrity_level', 'process_command_line', 'process_parent_path', 'process_parent_command_line']

            for mal_data in data_json:
                msg = ''
                for variables in data_1:
                    msg = msg + ' ' + mal_data[variables]

                patt4.append('we1775srv$'+msg)'''

        things = ['Account Name', 'EventCode', 'TaskCategory', 'Message', 'Impersonation Level', 'Token Elevation Type',
                  'Source Address', 'Source Port', 'Logon Type', 'OpCode', 'Type', 'Keywords', 'Subject ID', 'Object Type', 'Access Mask',
                  'Accesses', 'Share Name', 'Share Path', 'New Process Name', 'Process Name', 'Creator Process Name',
                  'Process Command Line', 'Object Server', 'Access Reasons', 'Privileges Used for Access Check',
                  'Resource Attributes', 'Enabled Privileges', 'Privileges', 'Relative Target Name', 'SYNCHRONIZE',
                  'ReadAttributes', 'Logon Process Name', 'Group Name', 'Group Domain', 'Name',
                  'Original Security Descriptor', 'New Security Descriptor']

        count = []
        a = 0
        for patt in data:

            patt2 = patt.replace('\n', '|')
            patt2 = patt2.replace(':|\t', '|')
            patt2 = patt2.replace(':', '|')
            patt2 = patt2.replace('=', '|')
            patt2 = patt2.replace('\t', '')
            patt3 = patt2.split('|')

            msg = ''
            for j in things:
                if j in patt3:
                    index = patt3.index(j) + 1
                    msg = msg + ' ' + patt3[index]

            patt4.append(msg)
            count.append(a)
            a += 1
        diction['msg'] = patt4
        # diction['Count'] = count
        # print(len(diction['msg']))

        # data.drop(['Unnamed: 0'], axis = 1, inplace = True)
        # data = data.append(pd.DataFrame(diction), ignore_index=True)
        data = pd.DataFrame(diction)
        print(data)
        # data.to_csv('we1775_malicious.csv')
        return data, i


def sent_to_vec():
    # data2 = pattern_parder()

    data2, user = pattern_parder()
    sentence = list(data2['msg'])
    model = SentenceTransformer('distilbert-base-nli-mean-tokens')
    embeddings = model.encode(sentence)
    embed = []

    for emb in embeddings:
        embed.append(np.array(emb))

    return embed


def DBSCAN_MODEL():
    arr = np.array(sent_to_vec())
    # Compute pairwise distances between all data points
    distances = pdist(arr)

    # Perform hierarchical clustering with a linkage method of your choice
    '''linkage_matrix = linkage(distances, method='ward')

    # Compute the distances between the cluster centroids at each level of the dendrogram
    cluster_distances = linkage_matrix[:, 2]

    # Find the knee point in the distances plot
    kneedle = KneeLocator(range(len(cluster_distances)), cluster_distances, S=1.0, curve="convex",
                          direction="increasing")
    eps = kneedle.elbow_y

    print("The optimal eps value is:", eps)'''

    model = DBSCAN(algorithm='auto', eps=2.33, leaf_size=30, metric='euclidean',
                   metric_params=None, min_samples=2, n_jobs=None, p=None)

    # We'll fit the model with x dataset and get the prediction data with the fit_predict() method.
    # arr = np.array(display_arr)

    pred = model.fit_predict(arr)

    # Next, we'll extract the negative outputs as the outliers.

    anom_index = np.where(pred == -1)  # Convert the tuple to a 1D array of indices

    values = arr[anom_index]

    return anom_index


def get_logs():
    user = sys.argv[1]
    #user = 'we1775srv'
    data2 = pd.read_csv(user + '.csv')
    data2 = list(data2['message'])
    list_to_be_return = {}
    pattern = []

    for patt in data2:
        patt2 = patt.replace('\n', '|')
        patt2 = patt2.replace(':|\t', '|')
        patt2 = patt2.replace('=', '|')
        patt2 = patt2.replace('\t', '')
        patt3 = patt2.split('|')
        pattern.append(patt3)

    things1 = ['SourceName', 'EventCode', 'Type', 'TaskCategory', 'Message']
    logs_table = []

    for i in pattern:
        anom_logs = {}
        anom_logs['timestamp'] = i[0]
        for j in things1:
            if j == 'SourceName':
                anom_logs['source'] = i[i.index(j) + 1]
            elif j == 'EventCode':
                anom_logs['eventId'] = i[i.index(j) + 1]
            elif j == 'Type':
                anom_logs['level'] = i[i.index(j) + 1]
            elif j == 'TaskCategory':
                anom_logs['taskCategory'] = i[i.index(j) + 1]
            else:
                anom_logs['message'] = i[i.index(j) + 1]

        logs_table.append(anom_logs)

    data_send = {}

    user_data1 = ModelData.find_user(user)
    if user_data1:
        list_to_be_return1 = user_data1.to_son().to_dict()
        list_to_be_return1['list_to_be_return'][user]['normal_logs'] = logs_table
        list_to_be_return[user] = list_to_be_return1['list_to_be_return'][user]
    else:
        data_send['normal_logs'] = logs_table
        list_to_be_return[user] = data_send

    ModelData.add_data(user=user, list_to_be_return=list_to_be_return)

def get_anomaly_logs(arr):
    user = sys.argv[1]
    #user = 'we1775srv$'
    data2 = pd.read_csv(user + '.csv')
    list_to_be_return = {}
    pattern = []
    matching_values = data2.loc[arr, 'message'].tolist()

    for patt in matching_values:
        patt2 = patt.replace('\n', '|')
        patt2 = patt2.replace(':|\t', '|')
        patt2 = patt2.replace('=', '|')
        patt2 = patt2.replace('\t', '')
        patt3 = patt2.split('|')
        pattern.append(patt3)

    things1 = ['SourceName', 'EventCode', 'Type', 'TaskCategory', 'Message']
    logs_table = []

    for i in pattern:
        anom_logs = {}
        anom_logs['timestamp'] = i[0]
        for j in things1:
            if j == 'SourceName':
                anom_logs['source'] = i[i.index(j) + 1]
            elif j == 'EventCode':
                anom_logs['eventId'] = i[i.index(j) + 1]
            elif j == 'Type':
                anom_logs['level'] = i[i.index(j) + 1]
            elif j == 'TaskCategory':
                anom_logs['taskCategory'] = i[i.index(j) + 1]
            else:
                anom_logs['message'] = i[i.index(j) + 1]

        logs_table.append(anom_logs)

    data_send = {}

    user_data1 = ModelData.find_user(user)
    if user_data1:
        list_to_be_return1 = user_data1.to_son().to_dict()
        print(list_to_be_return1)
        list_to_be_return1['list_to_be_return'][user]['pattern'] = logs_table
        list_to_be_return[user] = list_to_be_return1['list_to_be_return'][user]
    else:
        data_send['pattern'] = logs_table
        list_to_be_return[user] = data_send

    ModelData.add_data(user=user, list_to_be_return=list_to_be_return)

def get_user_pattern_anomaly():
    #user = 'we1775srv$'
    user = sys.argv[1]
    data2 = pd.read_csv(user + '.csv')
    list_to_be_return = {}
    user_pattern = []
    matching_values = data2.loc[arr, 'message'].tolist()
    things_user_pattern = ['EventCode', 'TaskCategory', 'Message', 'Source Address:', 'Process Name:', 'Privileges:',
                           'Process Command Line', 'Logon Type:', 'Enabled Privileges', 'Session ID']
    print(matching_values)

    for patt in range(5):
        patt2 = matching_values[patt].replace('\n', '|')
        patt2 = patt2.replace(':|\t', '|')
        patt2 = patt2.replace(':\\', '\\')
        patt2 = patt2.replace('=', '|')
        patt2 = patt2.replace('\t\t', '|')
        patt2 = patt2.replace(':\t', '|')
        patt2 = patt2.replace('\t', '')
        patt2 = patt2.replace('||', '|')
        patt3 = patt2.split('|')
        user_pattern.append(patt3)

    anomaly_user_pattern = []
    event = ''

    for index, i in enumerate(user_pattern):
        anom_logs = {'anomaly'+str(index): {}}
        anom_logs['anomaly'+str(index)]['timestamp'] = i[0]
        for j in things_user_pattern:

            if j == 'EventCode':
                anom_logs['anomaly'+str(index)]['eventId'] = i[i.index(j) + 1]
            elif j == 'TaskCategory':
                anom_logs['anomaly'+str(index)]['taskCategory'] = i[i.index(j) + 1]
            elif j == 'Source Address:':
                if 'Source Address:' not in i:
                    pass
                else:
                    anom_logs['anomaly'+str(index)]['value'] = i[i.index(j) + 1]
            elif j == 'Process Name:':
                if 'Process Name:' not in i:
                    pass
                else:
                    anom_logs['anomaly'+str(index)]['value'] = i[i.index(j) + 1]
            elif j == 'Privileges:':
                if 'Privileges:' not in i:
                    pass
                else:
                    anom_logs['anomaly'+str(index)]['value'] = i[i.index(j) + 1]

            elif j == 'Process Command Line':
                if 'Process Command Line' not in i:
                    pass
                else:
                    anom_logs['anomaly'+str(index)]['value'] = i[i.index(j) + 1]

            elif j == 'Logon Type:':
                if 'Logon Type:' not in i:
                    pass
                else:
                    anom_logs['anomaly'+str(index)]['value'] = i[i.index(j) + 1]
            elif j == 'Enabled Privileges':
                if 'Enabled Privileges' not in i:
                    pass
                else:
                    anom_logs['anomaly'+str(index)]['value'] = i[i.index(j) + 1]

            elif j == 'Session ID':
                if 'Session ID' not in i:
                    pass
                else:
                    anom_logs['anomaly'+str(index)]['value'] = i[i.index(j) + 1]

        anomaly_user_pattern.append(anom_logs)


    data_send2 = {}

    user_data1 = ModelData.find_user(user)
    if user_data1:
        list_to_be_return1 = user_data1.to_son().to_dict()
        print(list_to_be_return1)
        list_to_be_return1['list_to_be_return'][user]['anomolous_user_pattern'] = anomaly_user_pattern
        list_to_be_return[user] = list_to_be_return1['list_to_be_return'][user]
    else:
        data_send2['anomolous_user_pattern'] = anomaly_user_pattern
        list_to_be_return[user] = data_send2

    ModelData.add_data(user=user, list_to_be_return=list_to_be_return)

def get_user_pattern_normal():
    #user = 'we1775srv$'
    user= sys.argv[1]
    data2 = pd.read_csv(user + '.csv')
    data2 = list(data2['message'])
    list_to_be_return = {}
    user_pattern = []
    things_user_pattern = ['EventCode', 'TaskCategory', 'Message', 'Source Address:', 'Process Name:', 'Privileges:',
                           'Process Command Line', 'Logon Type:', 'Enabled Privileges', 'Session ID']

    for patt in range(5):
        patt2 = data2[patt].replace('\n', '|')
        patt2 = patt2.replace(':|\t', '|')
        patt2 = patt2.replace(':\\', '\\')
        patt2 = patt2.replace('=', '|')
        patt2 = patt2.replace('\t\t', '|')
        patt2 = patt2.replace(':\t', '|')
        patt2 = patt2.replace('\t', '')
        patt2 = patt2.replace('||', '|')
        patt3 = patt2.split('|')
        user_pattern.append(patt3)

    normal_user_pattern = []
    event = ''

    for index, i in enumerate(user_pattern):
        anom_logs = {'normal'+str(index): {}}
        anom_logs['normal'+str(index)]['timestamp'] = i[0]
        for j in things_user_pattern:

            if j == 'EventCode':
                anom_logs['normal'+str(index)]['eventId'] = i[i.index(j) + 1]
            elif j == 'TaskCategory':
                anom_logs['normal'+str(index)]['taskCategory'] = i[i.index(j) + 1]
            elif j == 'Source Address:':
                if 'Source Address:' not in i:
                    pass
                else:
                    anom_logs['normal'+str(index)]['value'] = i[i.index(j) + 1]
            elif j == 'Process Name:':
                if 'Process Name:' not in i:
                    pass
                else:
                    anom_logs['normal'+str(index)]['value'] = i[i.index(j) + 1]
            elif j == 'Privileges:':
                if 'Privileges:' not in i:
                    pass
                else:
                    anom_logs['normal'+str(index)]['value'] = i[i.index(j) + 1]

            elif j == 'Process Command Line':
                if 'Process Command Line' not in i:
                    pass
                else:
                    anom_logs['normal'+str(index)]['value'] = i[i.index(j) + 1]

            elif j == 'Logon Type:':
                if 'Logon Type:' not in i:
                    pass
                else:
                    anom_logs['normal'+str(index)]['value'] = i[i.index(j) + 1]
            elif j == 'Enabled Privileges':
                if 'Enabled Privileges' not in i:
                    pass
                else:
                    anom_logs['normal'+str(index)]['value'] = i[i.index(j) + 1]

            elif j == 'Session ID':
                if 'Session ID' not in i:
                    pass
                else:
                    anom_logs['normal'+str(index)]['value'] = i[i.index(j) + 1]

        normal_user_pattern.append(anom_logs)


    data_send3 = {}

    user_data1 = ModelData.find_user(user)
    if user_data1:
        list_to_be_return1 = user_data1.to_son().to_dict()
        print(list_to_be_return1)
        list_to_be_return1['list_to_be_return'][user]['normal_user_pattern'] = normal_user_pattern
        list_to_be_return[user] = list_to_be_return1['list_to_be_return'][user]
    else:
        data_send3['normal_user_pattern'] = normal_user_pattern
        list_to_be_return[user] = data_send3

    ModelData.add_data(user=user, list_to_be_return=list_to_be_return)


anomaly = DBSCAN_MODEL()
print(anomaly)
arr = np.array(anomaly)
arr = arr.flatten()
arr = arr.tolist()
count = len(arr)
connect('mongodb://localhost:27017/practice')
get_anomaly_logs(arr)
get_logs()
get_user_pattern_anomaly()
get_user_pattern_normal()

