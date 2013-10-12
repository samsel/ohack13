var collection, 
	logger,
	format,
	skip,
	limit = 10,
	mapper = require("./data/mapper");

format = function(results) {
	return {
		data: (results || [])
	};
};	

skip = function(pageNumber) {
	var skip = 0;
	if(pageNumber && pageNumber > 1) {
		skip = (pageNumber - 1) * limit;
	}

	return skip;
};	

module.exports = {

	init: function(db, winston) {
		collection = db.collection("business");
		logger = winston;
	},

	byLocation: function(lat, lon, page, callback) {
		collection.find({
			loc: {
					$near:[lon, lat]
				}
			}).skip(skip(page)).limit(limit).toArray(function(err, results) {
				if(err) logger.error(err.message);
				callback(format(results));
		}); 
	},

	byKeyword: function(keyword, page, callback) {
		var regex = {
			$regex: keyword, 
			$options: 'i'
		};
		collection.find({$or: [{ name: regex },
								{ street: regex },
								{ city: regex }]
                   }).skip(skip(page)).limit(limit).toArray(function(err, results) {
                   		if(err) logger.error(err.message);
						callback(format(results));
		});
	},

	byCategory: function(category, page, callback) {
		collection.find({
			productServiceDescription: { 
				$in: mapper[category] 
			}
		}).skip(skip(page)).limit(limit).toArray(function(err, results) {
						if(err) logger.error(err.message);
						callback(format(results));
		});
	},	

	default: function(page, callback) {
		collection.find().skip(skip(page)).limit(limit).toArray(function(err, results) {
			if(err) logger.error(err.message);
			callback(format(results));
		}); 
	}
};