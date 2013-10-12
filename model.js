var collection, 
	format;

format = function(obj) {
	return {
		data: obj
	};
}	

module.exports = {

	init: function(db) {
		collection = db.collection("business");
	},

	listByLocation: function(lat, long, callback) {

	},

	search: function(keyword, callback) {

	},

	default: function(callback) {
		collection.find().sort({"Business Name":-1}).limit(10).toArray(function(err, results) {
			callback(format(results));
		}); 
	}
};