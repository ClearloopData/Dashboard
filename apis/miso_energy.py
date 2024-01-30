# Code by Daniel Henricks for Clearloop.
# This script gets the most recent LMP Consolidated data from the MISO API.

import requests
import csv

url = "https://api.misoenergy.org/MISORTWDDataBroker/DataBrokerServices.asmx?messageType=getlmpconsolidatedtable&returnType=json"
res = requests.get(url)
data = res.json()["LMPData"]["FiveMinLMP"]["PricingNode"]
request_date = res.json()["LMPData"]["FiveMinLMP"]["HourAndMin"]
region_list = [] # If we want to select more than one region
louisiana_hub_data = data["name" == "LOUISIANA.HUB"]

with open("apis/data/miso_data_louisiana.csv", 'a', newline='', encoding='utf-8-sig') as results_file:
    csv_writer = csv.writer(results_file)
    csv_writer.writerow([request_date, louisiana_hub_data["LMP"], louisiana_hub_data["MLC"], louisiana_hub_data["MCC"]])
    