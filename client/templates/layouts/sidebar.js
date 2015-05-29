Template.sidebar.helpers({
	username: function() {return Meteor.user().username;},
	noUser: function() {return Meteor.users.find().count() === 0 || Meteor.user().emails[0].verified === false},
	genderTag: function() {
		var profile = Meteor.user().profile;
		return profile.gender;
	},
	standingTag: function() {
		var profile = Meteor.user().profile;
		return profile.standing;
	},
	majorsTags: function() {
		var profile = Meteor.user().profile;
		return profile.majors;
	},
	interestsTags: function() {
		var profile = Meteor.user().profile;
		return profile.interests;
	},
});

Template.sidebar.rendered = function() {
	$('.draggable').draggable({'revert': true});
	$('#search').on("keyup change", function() {
		/* Clear the possible matched list first */
		$("#list").empty();

		var input = $('#search').val();  // User input
		var matches = [];                // Possible matches

        /* If the user input is not null */
	    if(input.length > 0 && input !== '')
	    {
	      var genders = Genders.find();
	   	  var standings = Standings.find();
	   	  var majors = Majors.find();
	   	  var interests = Interests.find();

	      	for(var i = 0; i < genders.count(); i++)
	      	{
	        	if((genders.fetch())[i].discription.match(new RegExp(input, 'i')) !== null)
	            	 matches.push((genders.fetch())[i].discription);
	      	}

	      	for(var i = 0; i < standings.count(); i++)
	      	{
	        	if((standings.fetch())[i].discription.match(new RegExp(input, 'i')) !== null)
	              	matches.push((standings.fetch())[i].discription);
	      	} 
	      
	      	for(var i = 0; i < majors.count(); i++)
	      	{
	        	if((majors.fetch())[i].discription.match(new RegExp(input, 'i')) !== null)
	              	matches.push((majors.fetch())[i].discription);
	      	}

	      	for(var i = 0; i < interests.count(); i++)
	      	{
	        	if((interests.fetch())[i].discription.match(new RegExp(input, 'i')) !== null)
	              	matches.push((interests.fetch())[i].discription);
	      	}

	      	if(matches !== null)
	      	{
				if(matches.length > 0)
				{
					var to_print;
					if(matches.length > 5)
						to_print = 5;
					else
						to_print = matches.length;

					for(var i = 0; i < to_print; i++)
					{
						$("#list").append("<a>" + matches[i] + "</a>")
					}

					$('#matches').show();
				}
				else
					$('#matches').hide();	
			}
			else
				$('#matches').hide();
	    }
	    else
	    	$('#matches').hide();
	});
};