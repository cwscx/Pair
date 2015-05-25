Template.dashboard.helpers({
	newUser: function() {
		if(Meteor.user().profile.tagsNumber < 4)
			return true;
		else
			return false;
	},
})