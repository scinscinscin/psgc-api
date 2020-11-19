# PSGC (Philippine Standard Geographic Code)
API used for listing all the region, province, city, municipality, and barangay. All data came from <a href='https://psa.gov.ph' target='_blank'>Philippine Statistics Authority</a>. This API includes the total population for each regions etc. and other information.

# ENDPOINTS
```https://psgc-api.herokuapp.com```
REGION - ```/v1/region```
PROVINCE - ```/v1/province```
CITY - ```/v1/city```
MUNICIPALITY - ```/v1/municipality```
BARANGAY - ```/v1/barangay```
# SETUP
```$ npm install```

# START DEV SERVER
```$ npm run dev```

# PLANS
- [ ] fix the python script to merge all json according to appropriate codes
- [ ] automate uploading of json file once there's a new PSGC Excel File
- [ ] fix all the endpoints
- [ ] move to a proper server
- [ ] add rate limits

Made with 💜 by Justin Balaguer
<a href='twitter.com/ojintoji/'>Twitter</a>
<a href='facebook.com/ojintojix/'>Facebook</a>