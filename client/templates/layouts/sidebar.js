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
	firstTimeUser: function() {
		return Meteor.user().profile.firstTimeUser === true;
	},
	targetTags: function() {
		if(Meteor.user())
			return Meteor.user().profile.post.targetTags;
	}
});

Template.sidebar.events({
	'click .matchTag': function(event) {
		if(Meteor.user().profile.post)
		{
			var targetTags = Meteor.user().profile.post.targetTags;
			var input = $(event.target).html();
			if(targetTags.indexOf(input) === -1)
			{
				targetTags.push(input);
				Meteor.users.update(Meteor.user()._id, {$set: {'profile.post.targetTags': targetTags}});
			}
		}
		else
		{
			var targetTags = [];
			targetTags.push($(event.target).html());

			Meteor.users.update(Meteor.user()._id, {$set: {'profile.post.targetTags': targetTags}});
		}
		$('#search').val($(event.target).html());
		console.log($(event.target).html());
	},
	'click #customize': function() {
		if(Meteor.user().profile.post)
		{
			var targetTags = Meteor.user().profile.post.targetTags;
			var input = $('#search').val();
			if(targetTags.indexOf(input) === -1)
			{
				targetTags.push(input);
				Meteor.users.update(Meteor.user()._id, {$set: {'profile.post.targetTags': targetTags}});
			}
			else
			{
				var targetTags = [];
				targetTags.push(input);

				Meteor.users.update(Meteor.user()._id, {$set: {'profile.post.targetTags': targetTags}});
			}
		}
	},
	'click #postButton': function() {
		$('#search').val('');
		$('#matches').hide();
		$('#customize').hide();
	},
	'dblclick .doubleclick': function(event) {
		var unwanted = $(event.target).html();
		var targetTags = Meteor.user().profile.post.targetTags;
		var index = targetTags.indexOf(unwanted);

		targetTags.splice(index, 1);
		Meteor.users.update(Meteor.user()._id, {$set: {'profile.post.targetTags': targetTags}});
	},
});

Template.sidebar.rendered = function() {
	$('.draggable').draggable({'revert': true});
	$('#search').on("keyup change", function() {
		/* Clear the possible matched list first */
		for(var i = 0; i < 5; i++)
		{
			$('#list_'.concat(i)).empty();
		}
		$('#customize').hide();

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

            /* If the matches has value, we need to print it out */
	      	if(matches !== null)
	      	{
	      		/* Print at most 5 elements */
				if(matches.length > 0)
				{
					var to_print;
					if(matches.length > 5)
						to_print = 5;
					else
						to_print = matches.length;

					for(var i = 0; i < to_print; i++)
					{
						$('#list_'.concat(i)).append("<a>" + matches[i] + "</a>")
					}

					$('#matches').show();
				}
				/* If the matches have nothing, hide the dropbox */
				else
				{
					$('#matches').hide();
					$('#customize').show();
				}
			}
			else
				$('#matches').hide();
	    }
	    /* If nothing is entered, hide the dropbox */
	    else
	    	$('#matches').hide();
	});
	$('#')
};