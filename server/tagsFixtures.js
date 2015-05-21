if(Genders.find().count() === 0)
{
	Genders.insert({
		discription: "Male"
	});

	Genders.insert({
		discription: "Female"
	});
}


if(Standings.find().count() === 0)
{
	Standings.insert({
		discription: "Freshman/Sophomore"
	});

	Standings.insert({
		discription: "Junior/Senior"
	});

	Standings.insert({
		discription: "Master"
	});	

	Standings.insert({
		discription: "Phd"
	});	

	Standings.insert({
		discription: "Working"
	});
}

if(Meteor.isServer)
{
	Meteor.publish('gender', function() {return Genders.find();})
	Meteor.publish('standing', function() {return Standings.find();})
}