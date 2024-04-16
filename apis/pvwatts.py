API_KEY = 'Y2yCBCC2AKlkinwEAzBKjlCMDBH0q1wFiSurzk8E' # Do NOT share this with anyone else or post this publically. I only get 1,000 requests an hour
import requests
import csv # These are external libraries. Needed to open a csv.
with open('apis/data/PVWatts.csv', newline='', encoding='utf-8-sig') as csvfile: # This is where my input is located. I just extracted the latitude and longitude.
    reader = csv.reader(csvfile, delimiter=',', quotechar='|') # Read the CSV.
    for i in range(0):
        next(reader, None) # I have been running 500 lines at a time since the API is rate limited to 1,000 requests per hour.
    for i in range(500): # Starting at row 501 and going until row 1,000
        row = next(reader, None) # Get the next line.
        lat = row[0] # The latitude
        long = row[1] # The longitude
        params = { # These are the API parameters. You will need to edit these most likely.
            "format": "json",
            "api_key": API_KEY,
            "system_capacity": 1,
            "module_type": 2,
            "losses": 20,
            "array_type": 2,
            "tilt": 0,
            "azimuth": 180,
            "lat": lat,
            "lon": long,
            "dc_ac_ratio": 1.2
        }
        url = 'https://developer.nrel.gov/api/pvwatts/v6.json' # The endpoint you want to get.
        response = requests.get(url, params=params) # The HTTP get request.
        json = response.json()
        data_to_write = json["outputs"]["ac_annual"] # Returns a Python dict, this gets what I care about.
        with open('apis/data/final_data_2.csv', 'a', newline='') as results_file: # Write the output to another CSV with mode 'a' (Append).
            csv_writer = csv.writer(results_file)
            csv_writer.writerow([data_to_write]) # The actual writing.
            print("row " + str(i)  + " added") # Sanity check
            
            
      