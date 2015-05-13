Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', {name: "postsList"});
Router.route('/register', {name:"register"});
Router.route('/registerSuccess', {name:'registerSuccess'});