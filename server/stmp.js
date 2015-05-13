/*
Meteor.startup(function() {
	var smtp = {
		username: 'shengyang.shi1994@gmail.com',
		password: 'ray@1224cwscx',
		server: 'stmp.gmail.com',
		port: 25
	}

	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + 
							':' + encodeURIComponent(smtp.password) + 
							"@" + encodeURIComponent(smtp.server) +
							":" + encodeURIComponent(smtp.port);
});

if(Meteor.isServer)
{
	Meteor.startup(function() {
		Accounts.emailTemplates.verifyEmail.subject = function(user) {
			return 'Confirm Your Email Address';
		};

		Accounts.emailTemplates.verifyEmail.text = function(user, url) {
			return 'click on the following link to verify your email address: ' + url;
		};
	});

	Accounts.onCreateUser(function(options, user) {
		Meteor.setTimeout(function() {
			Accounts.sendVerificationEmail(user._id);
		}, 2000);

		return user;
	});
}
*/