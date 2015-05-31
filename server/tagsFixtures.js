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

if(Majors.find().count() === 0)
{
	/* Engineering */
	Majors.insert({
		category: "Engineering",
		discription: "Bioengineering"
	});

	Majors.insert({
		category: "Engineering",
		discription: "Bioinfomatics"
	});

	Majors.insert({
		category: "Engineering",
		discription: "Chemical Engineering"
	});

	Majors.insert({
		category: "Engineering",
		discription: "Computer Science"
	});

	Majors.insert({
		category: "Engineering",
		discription: "Electrical Engineering"
	});

	Majors.insert({
		category: "Engineering",
		discription: "Environmental Engineering"
	});

	/* Social Science */
	Majors.insert({
		category: "Social Science",
		discription: "Anthropology"
	});

	Majors.insert({
		category: "Social Science",
		discription: "Communication"
	});

	Majors.insert({
		category: "Social Science",
		discription: "Dance"
	});

	Majors.insert({
		category: "Social Science",
		discription: "Education"
	});

	/* Science */
	Majors.insert({
		category: "Science",
		discription: "Biology"
	});

	Majors.insert({
		category: "Science",
		discription: "Biochemistry"
	});

	Majors.insert({
		category: "Science",
		discription: "Chemistry"
	});

	Majors.insert({
		category: "Science",
		discription: "Cognitive Science"
	});

	Majors.insert({
		category: "Science",
		discription: "Environmental Science"
	});


	/* Medical */
	Majors.insert({
		category: "Medical",
		discription: "Biomedical"
	});

	Majors.insert({
		category: "Medical",
		discription: "Clinical Psychology"
	});

	/* Business */
	Majors.insert({
		category: "Business",
		discription: "Economics"
	});
}

if(Interests.find().count() === 0)
{
	Interests.insert({
		category: "Sports",
		discription: "Basketball"
	});

	Interests.insert({
		category: "Sports",
		discription: "Volleyball"
	});

	Interests.insert({
		category: "Sports",
		discription: "Baseball"
	});

	Interests.insert({
		category: "Sports",
		discription: "Iceball"
	});

	Interests.insert({
		category: "Casualty",
		discription: "Movies"
	});

	Interests.insert({
		category: "Casualty",
		discription: "Reading"
	});

	Interests.insert({
		category: "Casualty",
		discription: "Cooking"
	});
}

if(Meteor.isServer)
{
	Meteor.publish('gender', function() {return Genders.find();});
	Meteor.publish('standing', function() {return Standings.find();});
	Meteor.publish('major', function() {return Majors.find();});
	Meteor.publish('interests', function() {return Interests.find();});
	Meteor.publish('postUsers', function() {return Meteor.users.find();});
}