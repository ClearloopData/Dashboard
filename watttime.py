# This script will register a user with the WattTime API. Since this is only needed to be done once,
# this simple script suffices.

# Code by Daniel Henricks

import requests

register_url = 'https://api.watttime.org/register'
params = {'username': 'your_username_here',
         'password': 'your_password_here', # The password for your account must contain 8 characters, with at least one number and one special character.
         'email': 'your_email_here',
         'org': 'your_org_here'}

response = requests.post(register_url, json=params)
print(response.text) # Ensure the response worked correctly.
