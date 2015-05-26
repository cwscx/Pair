Template.sidebar.helpers({
	username: function() {return Meteor.user().username;},
	noUser: function() {return Meteor.users.find().count() === 0 || Meteor.user().emails[0].verified === false},
	genderTag: function() {
		var profile = Meteor.user().profile;
		return profile.gender;
	},
	standingTag: function() {
		var profile = Meteor.user().profile;
		return profile.standing;
	},
	majorsTags: function() {
		var profile = Meteor.user().profile;
		return profile.majors;
	},
	interestsTags: function() {
		var profile = Meteor.user().profile;
		return profile.interests;
	},
});

Template.sidebar.rendered = function() {
	$('.label').draggable({'revert': true});
};