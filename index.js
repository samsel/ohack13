var express = require("express"),
	config = require("./config"),
	mongoConfig = require('./mongo'),
	mongoClient = require('mongodb').MongoClient,
	model = require('./model'),	
	winston = require('winston'),
	winstonStream,
	app = express();


winston.add(winston.transports.File, { filename: 'app.log' });
winston.remove(winston.transports.Console);

winstonStream = {
	write: function(message, encoding){
		winston.info(message);
	}
};
app.use(express.logger({stream:winstonStream}));



mongoClient.connect(mongoConfig.url, config.db.config, function(err, db) {
    if(err) throw err;

    model.init(db, winston);

    // middleware for security
	// app.use(function(req, res, next) {
	// 	if(req.headers.appid && req.headers.appid === config.appid) {
	// 		next();
	// 	}
	// 	else {
	// 		res.json(401, {
	// 			error: "unauthorized api access buddy.."
	// 		});
	// 	}
	// });


	app.get("/", function(req, res) {

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

	app.get('*', function(req, res) {
		res.json(404, {
			error: "resource not found buddy.."
		});
	});	

	process.on("exit", function() {
		db.close();
	});

	app.listen(process.env.VMC_APP_PORT || config.port);

  });