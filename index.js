var express = require("express"),
	config = require("./config"),
	mongoClient = require('mongodb').MongoClient,
	model = require('./model'),	
	app = express();


mongoClient.connect(config.db.url + config.db.name, function(err, db) {
    if(err) throw err;

    model.init(db);

    // middleware for security
	app.use(function(req, res, next) {
		if(req.headers.appid && req.headers.appid === config.appid) {
			next();
		}
		else {
			res.json(401, {
				error: "unauthorized api access buddy.."
			});
		}
	});


	app.get("/", function(req, res) {
		if(err) throw err;

		var response = function(results) {
			res.json(results);
		};

		if(req.params.lat && req.params.long) {
			model.listByLocation(req.params.lat, response);
		}
		else if(req.params.search) {
			model.search(req.params.lat, response);
		}
		else {
			model.default(response);
		}

	});


	app.listen(config.port);	 

  });

//db.close();