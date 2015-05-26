Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
});

Router.route('/', {name: "postsList"});
Router.route('/register', {name:"register"});
Router.route('/registerSuccess', {name:'registerSuccess'});

Router.route('/:_id/dashboard', function () {
	var item = Meteor.users.findOne({_id: this.params._id});
	this.render('dashboard', {data: item});
});

Router.route('/:_id/tagModification', {
	name: 'tagnav',
});

Router.onBeforeAction('dataNotFound', {only: 'dashboard'});