Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
});

Router.route('/', {name: "postsList"});
Router.route('/register', {name:"register"});
Router.route('/registerSuccess', {name:'registerSuccess'});
Router.route('/dashboard/:_id', {
	name: 'dashboard',
	data: function() {return Meteor.users.findOne(this.params._id);}
});

Router.onBeforeAction('dataNotFound', {only: 'dashboard'});
