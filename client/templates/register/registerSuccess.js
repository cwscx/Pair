/* Go to main page after the confirmation email is clicked */
Accounts.onEmailVerificationLink(function(token, done) {
	Accounts.verifyEmail(token, function(error) {
		if(error) {
			alert(error);
		}
		else {
			Router.go('/dashboard/' + Meteor.user()._id);
		}
	});
});