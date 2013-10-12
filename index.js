var express = require("express"),
	config = require("./config"),
	mongoClient = require('mongodb').MongoClient,
	model = require('./model'),	
	app = express();


mongoClient.connect(config.db.url + config.db.name, config.db.config, function(err, db) {
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

		var query = req.query,
			page = parseInt((query.page || 1), 10),
			response = function(results) {
			res.json(results);
		};

		if(query.lat && query.lon) {
			model.byLocation(query.lat, query.lon, page, response);
		}
		else if(query.keyword) {
			model.byKeyword(query.keyword, page, response);
		}
		else if(query.category) {
			model.byCategory(query.category, page, response);
		}
		else {
			model.default(page, response);
		}

	});

	process.on("exit", function() {
		db.close();
	});

	app.listen(config.port);
	
  });