Template.userProfile.helpers({
	username: function() {return Meteor.user().username;},
	genderTag: function() {return Meteor.user().profile.gender;},
	standingTag: function() {return Meteor.user().profile.standing;},
	majorsTags: function() {return Meteor.user().profile.majors},
	interestsTags: function() {return Meteor.user().profile.interests},
});

Template.userProfile.rendered = function() {
	$("#profile").hide().fadeIn(1200);
}