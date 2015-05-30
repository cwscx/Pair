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
	},

	dropTags: function(content)
	{
  		var count = Meteor.user().profile.tagsNumber;
  		var gender = Meteor.user().profile.gender;
  		var standing = Meteor.user().profile.standing;
  		var majors = Meteor.user().profile.majors;
  		var interests = Meteor.user().profile.interests;

  		if(content === gender){
  			throw new Meteor.Error('Dropping gender', 'You cannot delete your gender! If you want to modify your gender, please click the modification button!');
  		}
  		else if(content === standing){
  			throw new Meteor.Error('Dropping standing', 'You cannot delete your standing! If you want to modify your gender, please click the modification button!');	
  		}
  		else
  		{
  			var index = majors.indexOf(content);
  			var index2 = interests.indexOf(content);

  			if(index !== -1)
  			{
  				if(majors.length > 1)
  				{
  					majors.splice(index, 1);
  					count--;

					Meteor.users.update(Meteor.user()._id, {$set: {'profile.majors':majors}});
					Meteor.users.update(Meteor.user()._id, {$set: {'profile.tagsNumber': count}});
  				}
  				else
 					throw new Meteor.Error('Dropping last major', 'You need to have at least one major!');
  			}
  			else if(index2 !== -1)
  			{
				if(interests.length > 1)
  				{
  					interests.splice(index2, 1);
  					count--;

					Meteor.users.update(Meteor.user()._id, {$set: {'profile.interests':interests}});
					Meteor.users.update(Meteor.user()._id, {$set: {'profile.tagsNumber': count}});
  				}
  				else
 					throw new Meteor.Error('Dropping last interest', 'You need to have at least one interest!');
  			}
  			else
  			{
  				throw new Meteor.Error('105', 'Serious Error!');
  			}
  		}
	},
  initialize: function() {
    var ucsd = new google.maps.LatLng(32.881, -117.238);
  },
});