Template.sidebar.helpers({
	username: function() {return Meteor.user().username;},
	noUser: function() {return Meteor.users.find().count() === 0 || Meteor.user().emails[0].verified === false},
	genderTag: function() {return Meteor.user().profile.gender;},
	standingTag: function() {return Meteor.user().profile.standing;},
	majorsTags: function() {return Meteor.user().profile.majors},
	interestsTags: function() {return Meteor.user().profile.interests},
});

Template.sidebar.rendered = function() {
	$('.label').draggable({revert: true});
}