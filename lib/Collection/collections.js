Posts = new Mongo.Collection('posts');

Genders = new Mongo.Collection('gender');
Standings = new Mongo.Collection('standing');
Majors = new Mongo.Collection('major');
Interests = new Mongo.Collection('interest');

Markers = new Mongo.Collection('markers');

Posts.allow({
	insert: function(userId, doc) {
		return !! userId;
	},
	remove: function(userId, doc) {
		return !! userId;
	}
});