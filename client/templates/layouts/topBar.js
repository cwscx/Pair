Template.topBar.helpers({
	errorMessage: function() {return Session.get('errorMessage')},
	noUser: function() {
		if(Meteor.user() === null)
			return true;
		else if(Meteor.user().emails[0].verified === false)
			return true;
		else
			return false;
	},
	username: function() {return ' Hello, ' + Meteor.user().username},
})


Template.topBar.events({
	'click .signout': function() {
		Meteor.logout(function(err) {
			if(err){
				alert(err);
			}
			else {
				Router.go('/');
			}
		});
	},

	'click #profilePage': function() {
		if(Meteor.user())
		{
			Session.set('dropError', '');
			setTimeout(function() {
				Router.go('/' + Meteor.user()._id + '/dashboard');
			}, 50);
		}
	},
});