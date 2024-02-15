# Clearloop/Vandy Dashboard Prototypes

## Code by Daniel Henricks for Clearloop during Spring 2024 internship.

### What's in this repository:

- Some pre-existing code that was used to connect to the current Firebase database
- Components that display current and historical power emissions
- Prototypes for displaying this data
- API calls to PVWatts + WattTime + MISO
- Power BI prototypes

### Done:

1. Convert previous Svelte dashboard into existing tech stack (React, Firebase) - done Jan 22.
2. Make API calls to WattTime and NREL dashboards - done Jan 25-26.
3. Style the existing components more consistently. - done Jan 29.
4. Change the color and styling of the timeline. - done Jan 31.
5. Set up an automatic database for the MISO price data - done Feb 1.
6. Sankey plot prototype from Commodore Cup. - done Feb 6.
7. Set up a Power BI dashboard - done Feb 6th.
8. Get access to GPM; integrate WattTime V3; get API key for WattTime - done Feb 14th.
9. Restructure everything in the dashboard to be more coherent. - done Feb 15th.

### To-do:

1. Create engaging and real-time graphics to display Vandy carbon footprint data - in progress
2. Expand the Sankey diagram
3. Get in contact with VUIT about hosting the website
4. Get an email to set up organizational databases.

### How to get started:

1. `git clone ` the repo
2. Run the commands:
   ```
   npm i
   npm run start
   ```
