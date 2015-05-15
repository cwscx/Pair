Template.dashboard.helpers({
	newUser: function() {
		if(Meteor.user().profile.tagsNumber === 0)
			return true;
		else
			return false;
	},
})