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

cred = credentials.Certificate("apis/watttime_database_config.json")
firebase_admin.initialize_app(cred, 
    {
    'databaseURL': "https://clearloop-watttime-default-rtdb.firebaseio.com/"
    }
                              )

to_push = []
ref = db.reference("/realtime/health_damage/TVA")

