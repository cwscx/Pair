if(Posts.find().count() == 0)
{
	Posts.insert({
		discription: "I want to eat at Panda"
	});

	Posts.insert({
		discription: "I want to eat at Boiling Crab"
	});
}

if(Meteor.isServer)
{
	Meteor.publish('posts', function() {return Posts.find();})
}