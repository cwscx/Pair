Template.userProfile.helpers({
	username: function() {return Meteor.user().username;},
	genderTag: function() {return Meteor.user().profile.gender;},
	standingTag: function() {return Meteor.user().profile.standing;},
	majorsTags: function() {return Meteor.user().profile.majors},
	interestsTags: function() {return Meteor.user().profile.interests},
});



Template.userProfile.events({
	'click #modify': function() {
		$('#profile').fadeOut(1200, function() {
			Session.set('selectedTag', 'gender');
			Session.set('selectError', '');
			Router.go('/' + Meteor.user()._id + '/tagModification');
		});
	},
});

Template.userProfile.rendered = function() {
	$("#profile").hide().fadeIn(1200);
	$(".label").draggable({revert: true});
};