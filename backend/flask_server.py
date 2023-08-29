import subprocess
import json
import pandas as pd
import numpy as np
import csv
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from pymodm import connect
from pymongo import MongoClient
from model_data_schema import ModelData

app = Flask(__name__)
CORS(app)

from flask import jsonify
from bson import json_util

@app.route("/getuser", methods=["GET"])
def getuser():
    try:

        result = ModelData.get_all_users()
        list_user = []
        i = 0
        for user in result:
            users = {}
            i += 1
            users['id'] = i
            users['text'] = user['user']

            list_user.append(users)

        return jsonify(list_user)

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route("/getdata", methods=["GET"])
def getdata():
    try:
        # Get the username from the query parameters
        # username = request.args.get('username')
        # print(username)
        database_name = 'practice'
        client = MongoClient('mongodb://localhost:27017/')
        # Access the database
        db = client[database_name]
        # Access the collection
        collection = db['modelData']
        print('here')
        result = list(collection.find({'user': 'we1775srv'}))

        # Close the connection
        client.close()

        # Return the JSON response
        return jsonify(result[0]['list_to_be_return'])

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route("/upload", methods=["POST"])
def upload():
    print("start uploading")
    file = request.files["file"]
    # save the file to the file system or process it in memory

    # Get the current directory path
    current_dir = os.getcwd()

    extension = os.path.splitext(file.filename)[1]
    if extension == '.csv':
        # Create the file path where you want to save the file
        file_path = os.path.join(current_dir, 'file' + extension)

        # Save the file
        file.save(file_path)

        unique_values = set()  # Create an empty set to store unique values
        header = pd.read_csv('file' + extension, nrows=0).columns.tolist()
        name_index = header.index('Account Name')
        with open('file' + extension, newline='') as csvfile:
            reader = csv.reader(csvfile)
            next(reader)  # Skip the header row
            for row in reader:
                unique_values.add(row[name_index])  # Add the value in the first column to the set

        unique_list = list(unique_values)  # Convert the set to a list

        print(unique_list)  # Print the list of unique values
        users_dataframe_generator(unique_list)
        Complete_Remain_Process(unique_list, True, True, True, True)
        response_body = json.dumps(unique_list)

        return response_body
    else:
        return jsonify({'error': 'Invalid File Extension'}), 500


@app.route("/feature", methods=["POST"])
def feature():
    print("start working")
    start_date = 'False'
    end_date = 'False'
    single_user = request.form.get("singleUser") == "true"
    multi_user = request.form.get("multiUser") == "true"
    whole_date = False
    if request.form.get("wholeDate"):
        whole_date = True
    else:
        start_date = request.form.get("startDate")
        end_date = request.form.get("endDate")
    users = request.form.get("Users")
    time = request.form.get("time") == "true"
    count = request.form.get("count") == "true"
    pattern = request.form.get("pattern") == "true"
    users_list = users.split(',')

    # Call csv function so that we get dataframe of all users separately in dictionary
    users_dataframe_generator(users_list)

    # Now will call the function in which we handle all other processes

    responseGraph = app.response_class(
        response=json.dumps(Complete_Remain_Process(users_list, single_user, count, time, pattern)),
        status=200,
        mimetype='application/json'
    )
    return responseGraph


def users_dataframe_generator(users):
    global dic_user
    usersList = users

    df = pd.read_csv("file.csv")
    df['time'] = pd.to_datetime(df['datetime'])

    df['timestamp'] = df["time"].values.astype(np.int64) / 1000000000
    cat = df['TaskCategory'].unique()
    user_dict = {}

    my_list = df.columns.values.tolist()

    acc_no = my_list.index('Account Name')

    task_cat = my_list.index('TaskCategory')

    tm = my_list.index('time')

    raw = my_list.index('raw')
    tm_stamp = my_list.index('timestamp')

    for user in usersList:
        diction = {'timestamp': [], 'message': []}
        for val_set in cat:
            diction[val_set] = []
        for idx, row in df.iterrows():
            if user in row[acc_no]:
                # diction['time'].append(row[tm])
                diction['message'].append(row[raw])
                diction['timestamp'].append(row[tm_stamp])
                add = row[task_cat]

                for val in diction:
                    if val == add:
                        diction[val].append(1)
                    elif val != 'time' and val != 'message' and val != 'timestamp':
                        diction[val].append(0)

        df1 = pd.DataFrame(diction)
        df1.to_csv(user + '.csv')


def Complete_Remain_Process(list_of_user, singleUser, count, time, pattern):
    list_to_be_return = {}
    filename = ''
    dir = os.getcwd()
    check_true = [count, time, pattern]
    count2 = check_true.count(True)

    for loop in range(0, count2):
        if singleUser:
            if count:
                filename = 'preprocessing_single_count_anomaly.py'
                count = False
            elif time:
                filename = 'preprocessing_single_time_anomaly.py'
                time = False
            elif pattern:
                filename = 'preprocessing_single_pattern.py'
                pattern = False

        file_path = os.path.join(dir, filename)

        if filename:
            for user in list_of_user:
                subprocess.run(['python', file_path, user])

                user_data = ModelData.find_user(user)
                user_dashboard_data = user_data.to_son().to_dict()
                data_model = user_dashboard_data['list_to_be_return']
                list_to_be_return.update(data_model)

        filename = ""
        print(list_to_be_return)

    return list_to_be_return


if __name__ == '__main__':
    connect('mongodb://localhost:27017/practice')
    app.run()

