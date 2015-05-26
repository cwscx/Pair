/* Go to main page after the confirmation email is clicked */
Accounts.onEmailVerificationLink(function(token, done) {
	Accounts.verifyEmail(token, function(error) {
		if(error) {
			alert(error);
		}
		else {
			if(Meteor.user())
			{
				setInterval(function() {
					Router.go('/' + Meteor.user()._id + '/dashboard');
				}, 100);
			}
		}
	});
});