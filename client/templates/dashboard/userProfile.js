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
	errMsg: function() {
		return Session.get('dropError');
	}
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
		revert: true,
	});
	$('.droppable').droppable({
		activeClass: "ui-state-highlight",
		drop: function(event, ui) {
			var content = ui.draggable.text();
			Meteor.call("dropTags", content, function(err) {
				if(err) {
					Session.set('dropError', err.reason);
				}
				else{
					Session.set('dropError', '');
				}
			})
		},
	});
	$('.droppable').on("drop", function(event, ui) {});
};