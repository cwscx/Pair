Meteor.methods({
	createNewUser: function(email_address, username, password, re_password)
	{
		if(password.localeCompare(re_password) !== 0) {
			throw new Meteor.Error('405', 'Password and re-entered password are not the same');
		}

		var UserID = Accounts.createUser({
			username: username,
			email: email_address,
			password: password,
		});

		return UserID;
	}
});