import pytz
from datetime import datetime
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

url = "https://api.watttime.org/v3/forecast/"
headers = {"Authorization": f"Bearer {TOKEN}"}
params = {
    "region": "CAISO_NORTH",
    "signal_type": "health_damage",
}
response = requests.get(url, headers=headers, params=params)

cred = credentials.Certificate("apis/watttime_database_config.json")
firebase_admin.initialize_app(cred, 
    {
    'databaseURL': "https://clearloop-watttime-default-rtdb.firebaseio.com/"
    }
                              )
   
to_push = []

i = 0
for entry in response.json()['data']:
    to_push.append({"index": i, "time": entry["point_time"], "value": entry["value"]})
    i += 1

ref = db.reference("/health_data/CAISO_NORTH")
for item in to_push:
    ref.push(item)