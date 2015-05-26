Template.dashboard.helpers({
	newUser: function() {
		/* firstTimeUser will be set to false when the done button is clicked at
		 * the first time the user log in */
		var profile = Meteor.user().profile;
		if(profile.firstTimeUser === true)
			return true;
		else 
			return false;
	},
	noUser: function() {
		if(Meteor.user() === null)
			return true;
		else
			return false;
	},
});