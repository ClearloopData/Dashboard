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
import requests
from requests.auth import HTTPBasicAuth
import csv

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

regions = ["TVA", "SOCO", "CAISO_NORTH", "MISO_LOWER_MS_RIVER", "ERCOT_NORTHCENTRAL", "ISONE_CT", "ISONE_ME", "ISONE_NEMA", "ISONE_NH", "ISONE_RI", "ISONE_SEMA", "ISONE_VT", "ISONE_WCMA"]

for region in regions:
    start = 1704067200  # Jan 1st, 2024
    today = 1706745600

    with open('apis/data/health_damage_data.csv', 'a', newline='') as csvfile:
        fieldnames = ['region', 'date', 'value']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        while start <= (today - 60 * 60 * 24):
            end_time = start + 60 * 60 * 24
            dt = datetime.utcfromtimestamp(start).isoformat() + 'Z'
            dt2 = datetime.utcfromtimestamp(end_time).isoformat() + 'Z'

            url = "https://api.watttime.org/v3/forecast/historical"
            headers = {"Authorization": f"Bearer {TOKEN}"}
            params = {
                "start": dt,
                "end": dt2,
                "region": region,
                "signal_type": "health_damage",
                "horizon_hours": 0
            }
            response = requests.get(url, headers=headers, params=params)
            json_res = response.json()

            sum = 0
            for entry in json_res['data']:
                sum += entry['forecast'][0]["value"]
            daily_average_health_damage = round(sum / 288)

            res = requests.get(url, params=params, headers=headers)
            writer.writerow({
                'region': region,
                'date': dt,
                'value': daily_average_health_damage
            })
            print(daily_average_health_damage)
            start += (24 * 60 * 60)

    print(f'{region} data finished saving to CSV file.')