# Code by Daniel Henricks

import os
from dotenv import load_dotenv, find_dotenv
import firebase_admin
from firebase_admin import db, credentials
import requests
from requests.auth import HTTPBasicAuth

login_url = 'https://api.watttime.org/login'
load_dotenv(find_dotenv())
PASSWORD = os.environ.get("WATTTIME_PASSWORD")
final_res = {}
rsp = requests.get(login_url, auth=HTTPBasicAuth('clearloop', PASSWORD))
TOKEN = rsp.json()['token']
url = "https://api.watttime.org/v3/forecast"
headers = {"Authorization": f"Bearer {TOKEN}"}

for i in ("TVA", "ERCOT_NORTHCENTRAL", "CAISO_NORTH"):
    params = {
        "region": i,
        "signal_type": "co2_moer",
        "horizon_hours": 0
    }
    response = requests.get(url, headers=headers, params=params)
    final_res[i] = response.json()["data"][0]["value"]


cred = credentials.Certificate("apis/watttime_database_config.json")
firebase_admin.initialize_app(cred, 
    {
    'databaseURL': "https://clearloop-watttime-default-rtdb.firebaseio.com/"
    }
                              )
   
ref = db.reference("/moer")
ref.push(final_res)

# The final_res array will take the form of (example): 
# {'TVA': 1177.6, 'ERCOT_NORTHCENTRAL': 653.2, 'CAISO_NORTH': 1012.9}

