Meteor.methods({
	createNewUser: function(email_address, username, password, re_password)
	{
		var UserID = Accounts.createUser({
			username: username,
			email: email_address,
			password: password
		});

		return UserID;
	}
});