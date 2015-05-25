Template.dashboard.helpers({
	newUser: function() {
		/* firstTimeUser will be set to false when the done button is clicked at
		 * the first time the user log in */
		if(Meteor.user().profile.firstTimeUser === true)
			return true;
		else 
			return false;
	},
})