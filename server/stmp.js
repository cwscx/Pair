/* Mandrill email config */
Meteor.startup(function() {
	Meteor.Mandrill.config({
		username: "shengyang.shi%40hotmail.com",
		key: "mmJ8sEJyhJuZ4XBfsFmdig",
		port: 587
	});

	process.env.MAIL_URL = 'smtp://shengyang.shi%40hotmail.com:' + encodeURIComponent('mmJ8sEJyhJuZ4XBfsFmdig') + "@smtp.mandrillapp.com:587";
});

Accounts.config({
	sendVerificationEmail: true,
});

if(Meteor.isServer)
{
	Meteor.startup(function() {
		Accounts.emailTemplates.header = "Pair";
		Accounts.emailTemplates.siteName = "Pair";

		Accounts.emailTemplates.verifyEmail.subject = function(user) {
			return 'Confirm Your Email Address';
		};

		Accounts.emailTemplates.verifyEmail.text = function(user, url) {
			return 'click on the following link to verify your email address: \n' + url;
		};
	});

    /* After a new User is created, this will always be called to send a verfication email */
	Accounts.onCreateUser(function(options, user) {
		user.profile = {};

		Meteor.setTimeout(function() {
			Accounts.sendVerificationEmail(user._id);
  		}, 2 * 1000);

		return user;
	});
}
