Meteor.methods({
	createNewUser: function(email_address, first_name, last_name, password, re_password)
	{
		var full_name = first_name + last_name;
		var UserID = Accounts.createUser({
			username: full_name,
			email: email_address,
			password: password
		});

		return UserID;
	}
});