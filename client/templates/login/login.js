Template.login.events({
	'submit form': function(e){
		e.preventDefault();

		var email = $(e.target).find('[name = email]').val();
		var password = $(e.target).find('[name = password]').val();


		if(!email) {
			Session.set('errorMessage', 'Email address is required.');
			return false;
		}

		if(!password) {
			Session.set('errorMessage', 'Password is required.');
			return false;
		}

		Meteor.loginWithPassword(email, password, function(error) {
			if(error) {
				Session.set('errorMessage', error.message);

				return false;
			}

			if(Meteor.user().emails[0].verified === false) {
				Session.set('errorMessage', "Your email address is not verified.");
				return false;
			}
			
			Router.go('/' + Meteor.user()._id + '/dashboard');				
		});

		return false;
	}
});

