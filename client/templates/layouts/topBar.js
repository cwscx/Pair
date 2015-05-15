Template.topBar.helpers({
	errorMessage: function() {return Session.get('errorMessage')},
	noUser: function() {return Meteor.users.find().count() === 0},
	username: function() {return 'Hello, ' + Meteor.user().username},
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
	}
});