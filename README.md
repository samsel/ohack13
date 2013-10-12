## ohack 2013 backend code
###### http://www.hackathon.io/opportunityfund


### API Reference

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

##### all API calls can take 'page' with values > 1 in query for returning paginated results