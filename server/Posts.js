if(Posts.find().count() === 0)
{
	for(var i = 0; i < Meteor.users.find().count(); i++)
	{
		var user = Meteor.users.find().fetch()[i];

		if(user.profile.havepost)
		{
			Posts.insert({
				posterId: user._id,
			});
		}
	}
}

if(Meteor.isServer)
{
	Meteor.publish('posts', function() {return Posts.find();})
}