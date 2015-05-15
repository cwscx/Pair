Template.dashboard.helpers({
	newUser: function() {
		if(Meteor.users.find(Meteor.userId, {fields: {
			'profile.tagsNumber': 0,
		}}).count() === 1)
			return true;
		else
			return false;
	},
})