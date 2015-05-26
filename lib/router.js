Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
});

Router.route('/', {name: "postsList"});
Router.route('/register', {name:"register"});
Router.route('/registerSuccess', {name:'registerSuccess'});

Router.route('/:_id/dashboard', {
	name: 'dashboard',
	data: function() {return Meteor.users.findOne(this.params._id);}
});

Router.route('/:_id/tagModification', {
	name: 'tagnav',
	data: function() {return Meteor.users.findOne(this.params._id);}
});

Router.onBeforeAction('dataNotFound', {only: 'dashboard'});
Router.onBeforeAction('dataNotFound', {only: 'tagnav'});