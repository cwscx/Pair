Template.userProfile.helpers({
	username: function() {return Meteor.user().username;},
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



Template.userProfile.events({
	'click #modify': function() {
		$('#profile').fadeOut(1200, function() {
			Session.set('selectedTag', 'gender');
			Session.set('selectError', '');
			
			var id = Meteor.user()._id;
			Router.go('/' + id + '/tagModification');
		});
	},
});

Template.userProfile.rendered = function() {
	$("#profile").hide().fadeIn(1200);
	$('.draggable').draggable({
		revert: 'invalid',
	});
};