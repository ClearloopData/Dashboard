import os
import time
from datetime import datetime
from itertools import groupby
from dotenv import load_dotenv, find_dotenv
import firebase_admin
from firebase_admin import db, credentials
import requests
from requests.auth import HTTPBasicAuth

load_dotenv(find_dotenv())
PASSWORD = os.environ.get("GPM_PASSWORD")

url = 'https://webapisiliconranch.horizon.greenpowermonitor.com/api/Account/Token'

headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

data = {
    'username': 'mwebster',
    'password': PASSWORD
}

cred = credentials.Certificate("apis/watttime_database_config.json")
firebase_admin.initialize_app(cred, 
    {
    'databaseURL': "https://clearloop-watttime-default-rtdb.firebaseio.com/"
    }
                              )

response = requests.post(url, json=data, headers=headers)
TOKEN = response.json()["AccessToken"]
url = 'https://webapisiliconranch.horizon.greenpowermonitor.com/api/DataList'
headers = {"Authorization": f"Bearer {TOKEN}"}

# Note that these are the parameters for Jackson, TN.
# 2575415: Jackson; 3100535: Paris.
params = {
    'dataSourceId': 2575415,
    'startDate': 1661990400, # September, 2022.
    'endDate': int(time.time()), # The current time (in Unix format)
    'aggregationType': 0, # Sum without zeros. See https://webapisiliconranch.horizon.greenpowermonitor.com/swagger/ui/index#!/DataList/DataList_GetDataList.
    'grouping': 'month'
}

res = requests.get(url, params=params, headers=headers)
json_res = res.json()

for entry in json_res:
    month = entry["Date"][0:7]
    value = entry["Value"] # this is in kwh
    doc_ref = db.reference("/historical/jackson")
    doc_ref.child(month).set({"mwh": int(value/1000)})

print("Jackson data updated on Firebase successfully!")

params = {
    'dataSourceId': 3100535,
    'startDate': 1682898900, # September, 2022.
    'endDate': int(time.time()), # The current time (in Unix format)
    'aggregationType': 0, # Sum without zeros. See https://webapisiliconranch.horizon.greenpowermonitor.com/swagger/ui/index#!/DataList/DataList_GetDataList.
    'grouping': 'month'
}

res = requests.get(url, params=params, headers=headers)
json_res = res.json()

manual_data_paris = [{"Date": "2023-01", "Value": 59.20}, {"Date": "2023-02", "Value": 124.80},
                     {"Date": "2023-03", "Value": 158.60}, {"Date": "2023-04", "Value": 200.12}]


for entry in json_res:
    month = entry["Date"][0:7]
    value = entry["Value"]
    doc_ref = db.reference("/historical/paris")
    doc_ref.child(month).set({"mwh": int(value/1000)})
    
