## ohack 2013 backend code
###### http://www.hackathon.io/opportunityfund


### Rest api Reference

* api responses follow standard HTTP codes (200 for success, 401 unauthorized, etc)
* all API calls can take 'page' with values > 1 in query for returning paginated results

#### search by location
	/?lat=<latitude>&lon=<longitude>

#### free text search
	/?keyword=<anything>

#### search by category
	/?category=<category>

category could be one of the following
* business_services
* shopping
* health
* home_services
* restaurant
* travel


### Sample response (successful)
```javascript
	{
		"data": [
			{
				"name" : <name>,
				"street" : <street>,
				"city" : <city>,
				"zip" : <zip>,
				"phoneNumber1" : <phoneNumber1>,
				"phoneNumber2" : <phoneNumber1>
			}
		]
	}
```


### Sample response (error)

```javascript
	{
		"error": <description>
	}
```