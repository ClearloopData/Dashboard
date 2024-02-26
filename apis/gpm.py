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


response = requests.post(url, json=data, headers=headers)

TOKEN = response.json()["AccessToken"]
url = 'https://webapisiliconranch.horizon.greenpowermonitor.com/api/DataList'
headers = {"Authorization": f"Bearer {TOKEN}"}
params = {
    'dataSourceId': 2575415,
    'startDate': 1661990400,
    'endDate': int(time.time()),
    'aggregationType': 0,
    'grouping': 'month'
}

res = requests.get(url, params=params, headers=headers)

json_res = res.json()
print(json_res)