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
final_res = []
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

MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
year = 1
month = 4
days = 0
while year < 2:
    sum_for_month = 0
    for num in range(DAYS_IN_MONTH[month]):
        start_time = 1682898900 + (days+1) * 60 * 60 * 24
        end_time = 1682898900 + (days+2) * 60 * 60 * 24
        dt = datetime.utcfromtimestamp(start_time).isoformat() + 'Z'
        print(dt)
        dt2 = datetime.utcfromtimestamp(end_time).isoformat() + 'Z'
        url = "https://api.watttime.org/v3/forecast/historical"
        headers = {"Authorization": f"Bearer {TOKEN}"}
        params = {
                "start": dt,
                "end": dt2,
                "region": "TVA",
                "signal_type": "co2_moer",
                "horizon_hours": 0
            }

        response = requests.get(url, headers=headers, params=params)
        json_res = response.json()
        moer_arr = []
        i = 0
        for el in json_res['data']:
            if i%12==0:
                moer_arr.append(el['forecast'][0]['value'])
            i = i + 1

        url = 'https://webapisiliconranch.horizon.greenpowermonitor.com/api/DataList'
        headers = {"Authorization": f"Bearer {TOKEN_2}"}

        params = {
            'dataSourceId': 3100535,
            'startDate': start_time, # September, 2022.
            'endDate': end_time, # The current time (in Unix format)
            'aggregationType': 0, # Sum without zeros. See https://webapisiliconranch.horizon.greenpowermonitor.com/swagger/ui/index#!/DataList/DataList_GetDataList.
            'grouping': 'hour'
        }

        res = requests.get(url, params=params, headers=headers)
        json_res = res.json()
        kwh_arr = []
        for i in json_res:
            kwh_arr.append(i["Value"])
        it = 0
        summ = 0
        for i in kwh_arr:
            if it >= len(moer_arr):
                # No data available, so estimate.
                summ + kwh_arr[it] * 1200 / 1000
            else: summ = summ + kwh_arr[it] * moer_arr[it] / 1000
            it = it + 1
        days = days+1
        sum_for_month = sum_for_month + summ
        
    month = month + 1
    year = year + int(month/12)
    month = month%12
    print(sum_for_month)