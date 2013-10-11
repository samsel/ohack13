var express = require("express"),
	config = require("./config"),
	app = express();


app.use(function(req, res, next) {
	console.log(req.headers);
	if(req.headers.appid && req.headers.appid === config.appid) {
		next();
	}
	else {
		res.json(401, {
			error: "Unauthorized api access!"
		});
	}
});

app.get("/", function(req, res) {
	res.json(config);
});

app.listen(config.port);