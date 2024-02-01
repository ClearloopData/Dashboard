# Code by Daniel Henricks for Clearloop.
# This script will get the automated data from the Firebase database and format it into a .csv file.

import firebase_admin
from firebase_admin import db
import csv

if not firebase_admin._apps: # Check if the app is initialized. No need to run code twice.
        cred_obj = firebase_admin.credentials.Certificate('apis/database_config.json')
        default_app = firebase_admin.initialize_app(cred_obj, {
        'databaseURL': "https://clearloop-miso-data-default-rtdb.firebaseio.com"
        }) 
ref = db.reference("/five_min_data")
data = ref.get()
for identifier, entry in data.items():
    arkansas_data = entry.get('arkansas_data', [])
    louisiana_data = entry.get('louisiana_data', [])
    date = entry.get('request_date', [])
    time = entry.get('request_time', [])
    arkansas_lmp = arkansas_data[0]["LMP"]
    louisiana_lmp = louisiana_data[0]["LMP"]
    with open('apis/data/miso_data_auto.csv', 'a', newline='', encoding='utf-8-sig') as results_file:
        csv_writer = csv.writer(results_file)
        csv_writer.writerow([date[0], time, arkansas_lmp, louisiana_lmp])
