# Code by Daniel Henricks. This code should:
# 1) Calculate the health damage per day ($/MWh)
# 2) Calculate the power on a daily basis (a good estimate)
# 3) Combine the two to find the $ of health damage prevented.
# Note: The model used is WattTime's health_damage endpoint, which is based off of InMAP.
# Future investigation into InMap could be very interesting.

import time
from datetime import date, datetime, timedelta
import os
from dotenv import load_dotenv, find_dotenv
import firebase_admin
from firebase_admin import db, credentials
import requests
from requests.auth import HTTPBasicAuth

login_url = 'https://api.watttime.org/login'
load_dotenv(find_dotenv())
PASSWORD = os.environ.get("WATTTIME_PASSWORD")
rsp = requests.get(login_url, auth=HTTPBasicAuth('clearloop', PASSWORD))
TOKEN = rsp.json()['token']

PASSWORD_2 = os.environ.get("GPM_PASSWORD")
url = 'https://webapisiliconranch.horizon.greenpowermonitor.com/api/Account/Token'
headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

data = {
    'username': 'mwebster',
    'password': PASSWORD_2
}

response = requests.post(url, json=data, headers=headers)

TOKEN_2 = response.json()["AccessToken"]

cred = credentials.Certificate("apis/watttime_database_config.json")
firebase_admin.initialize_app(cred, 
    {
    'databaseURL': "https://clearloop-watttime-default-rtdb.firebaseio.com/"
    }
                              )
   
to_push = []
ref = db.reference("/health_damage/TVA")


start = 1704067200 # Jan 1st, 2024 
today = int(time.time())

while start <= (today  - 60 * 60 * 24):
    end_time = start + 60 * 60 * 24
    dt = datetime.utcfromtimestamp(start).isoformat() + 'Z'
    dt2 = datetime.utcfromtimestamp(end_time).isoformat() + 'Z'
    url = "https://api.watttime.org/v3/forecast/historical"
    headers = {"Authorization": f"Bearer {TOKEN}"}
    params = {
            "start": dt,
            "end": dt2,
            "region": "TVA",
            "signal_type": "health_damage",
            "horizon_hours": 0
    }

    response = requests.get(url, headers=headers, params=params)
    json_res = response.json()
    sum = 0
    for entry in json_res['data']:
        sum += entry['forecast'][0]["value"]
    
    daily_average_health_damage = round(sum / 288)
    url = 'https://webapisiliconranch.horizon.greenpowermonitor.com/api/DataList'
    headers = {"Authorization": f"Bearer {TOKEN_2}"}

    params = {
        'dataSourceId': 3100535,
        'startDate': start, 
        'endDate': end_time, 
        'aggregationType': 0, # Sum without zeros. See https://webapisiliconranch.horizon.greenpowermonitor.com/swagger/ui/index#!/DataList/DataList_GetDataList.
        'grouping': 'day'
    }

    res = requests.get(url, params=params, headers=headers)
    mwh_day = res.json()[0]['Value'] / 1000
    
    ref.push().set({
        'date': dt,
        'value': mwh_day * daily_average_health_damage
    })
    start += (24 * 60 * 60)
    
print("Data finished uploading to Firebase")
