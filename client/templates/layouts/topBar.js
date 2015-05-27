Template.topBar.helpers({
	errorMessage: function() {return Session.get('errorMessage')},
	noUser: function() {return Meteor.users.find().count() === 0 || Meteor.user().emails[0].verified === false},
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
			setTimeout(function() {
				Router.go('/' + Meteor.user()._id + '/dashboard');
			}, 50);
		}
	},
});

Template.topBar.rendered = function() {
	$(document).ready(function() {
		$( ".droppable" ).droppable({
  			activeClass: "ui-state-highlight",
  			drop: function( event, ui ) {}
		});
	});
	$( ".droppable" ).on( "drop", function( event, ui ) {} );
};