Template.sidebar.helpers({
	username: function() {return Meteor.user().username;},
	noUser: function() {return Meteor.user() === null || Meteor.user().emails[0].verified === false},
	genderTag: function() {
		if(Meteor.user())
		{
			var profile = Meteor.user().profile;
			return profile.gender;
		}
	},
	standingTag: function() {
		if(Meteor.user())
		{
			var profile = Meteor.user().profile;
			return profile.standing;
		}
	},
	majorsTags: function() {
		if(Meteor.user())
		{
			var profile = Meteor.user().profile;
			return profile.majors;
		}
	},
	interestsTags: function() {
		if(Meteor.user())
		{
			var profile = Meteor.user().profile;
			return profile.interests;
		}
	},
	firstTimeUser: function() {
		if(Meteor.user())
		{
			return Meteor.user().profile.firstTimeUser === true;
		}
	},
	targetTags: function() {
		/* If the cuurent Session has value, get the current Session's tmp tags */
		if(Session.get('targetTags'))
			return Session.get('targetTags');
		else if(Meteor.user() && Meteor.user().profile.post)
			return Meteor.user().profile.post.targetTags;
	},
	errorMessage: function() {
		return Session.get('postError');
	},
});

Template.sidebar.events({
	'click .matchTag': function(event) {
		if((Meteor.user().profile.post && Meteor.user().profile.post.targetTags) || Session.get('targetTags'))
		{
			var targetTags;

			if(Session.get('targetTags'))
				targetTags = Session.get('targetTags');
			else
				targetTags = Meteor.user().profile.post.targetTags;

			var input = $(event.target).html();
			if(targetTags.indexOf(input) === -1)
			{
				targetTags.push(input);
				Session.set('targetTags', targetTags);
			}
		}
		else
		{
			var targetTags = [];
			targetTags.push($(event.target).html());
			Session.set('targetTags', targetTags);
		}

		$('#search').val($(event.target).html());
		$('#matches').hide();
	},
	'click #customize': function() {
		if(Meteor.user().profile.post)
		{
			var targetTags;

			if(Session.get('targetTags'))
				targetTags = Session.get('targetTags');
			else
				targetTags = Meteor.user().profile.post.targetTags;

			var input = $('#search').val();
			if(targetTags.indexOf(input) === -1)
			{
				targetTags.push(input);
				Session.set('targetTags', targetTags);
			}
			else
			{
				var targetTags = [];
				targetTags.push(input);
				Session.set('targetTags', targetTags);
			}
		}
	},
	'click #postButton': function() {
		if(Meteor.user().profile.havepost || Meteor.user().profile.havepost === true)
		{
		}
		else
		{
			$('.modal').modal('show');
			$('#search').val('');

			if(Meteor.user().profile.post)
			{
				if(!Meteor.user().profile.post.what)	
					$('#what').val('');
				else
					$('#what').val(Meteor.user().profile.post.what)

				if(!Meteor.user().profile.post.appointment)
				{
					$('#mm').val('');
					$('#hh').val('');
				}
				else
				{
					/* Doing math to calculate the time difference properly */
					var curD = new Date();
					var difHr = Meteor.user().profile.post.appointment.getHours() - curD.getHours();
					var difMin = Meteor.user().profile.post.appointment.getMinutes() - curD.getMinutes();
					var difTime = difHr * 60 + difMin;
					difHr = Math.floor(difTime / 60);
					difMin = difTime % 60;

					if(difHr < 0 || (difHr <= 0 && difMin <= 0))
					{
						$('#mm').val('');
						$('#hh').val('');
						Meteor.users.update(Meteor.user()._id, {$set: {'profile.post.appointment': null}});
					}
					else 
					{
						$('#mm').val(difMin);
						$('#hh').val(difHr);
					}
				}
			}
			else
			{
				$('#what').val('');
				$('#mm').val('');
				$('#hh').val('');
			}

			$('#matches').hide();
			$('#customize').hide();

			Session.set('postError', null);
			if(Meteor.user().profile.post)
			{
				Session.set('targetTags', Meteor.user().profile.targetTags);
				Session.set('what', $('#what').val());
				Session.set('hh', $('#hh').val());
				Session.set('mm', $('#mm').val());
			}
			else
			{
				Session.set('targetTags', null);
				Session.set('what', null);
				Session.set('hh', null);
				Session.set('mm', null);
			}

			if(Meteor.user().profile.post)
				Session.set('location', Meteor.user().profile.post.location);
			else
				Session.set('location', null)
			
			if(Meteor.user().profile.post)
				Session.set('locationName', Meteor.user().profile.post.locationName);
			else
				Session.set('locationName', null);

			setTimeout(function() {
				google.maps.event.trigger(GoogleMaps.maps.exampleMap.instance, 'resize');
			},400);
		}
	},
	'dblclick .doubleclick': function(event) {
		var unwanted = $(event.target).html();
		var targetTags;

		if(Session.get('targetTags'))
			targetTags = Session.get('targetTags');
		else
			targetTags = Meteor.user().profile.post.targetTags;

		var index = targetTags.indexOf(unwanted);

		targetTags.splice(index, 1);
		Session.set('targetTags', targetTags);
	},
	'change #what': function() {
		var input = $('#what').val();

		if(input === '')
			Session.set('what', null);
		else
			Session.set('what', input);
	},
	'change #hh': function() {
		var input = $('#hh').val();
		if(isNaN(input) === true)
			Session.set('postError', 'Please enter a valid hour number!');
		else
		{
			if(input >= 12)
				Session.set('postError', 'Please enter a valid time period less than 12 hrs!');
			else
			{
				Session.set('hh', input);
				Session.set('postError', '');
			}
		}
	},
	'change #mm': function() {
		var input = $('#mm').val();
		if(isNaN(input) === true)
			Session.set('postError', 'Please enter a valid minute number!');
		else
		{
			if(input >= 60)
				Session.set('postError', 'Please enter a valid time period for minutes!');
			else
			{
				Session.set('mm', input);
				Session.set('postError', '');
			}
		}
	},
	'click #save': function() {
			Session.set('postError', '');

			var targetTags = Session.get('targetTags');
			var what = Session.get('what');
			var hh = Session.get('hh');
			var mm = Session.get('mm');
			var location = Session.get('location');
			var locationName = Session.get('locationName');
			console.log(what);

			var d = new Date();
			d.setMinutes(Number(d.getMinutes()) + Number(mm));
			d.setHours(Number(d.getHours()) + Number(hh));
			
			if(targetTags !== undefined)
				Meteor.users.update(Meteor.user()._id, {$set: {'profile.post.targetTags': targetTags}});
			
			Meteor.users.update(Meteor.user()._id, {$set: {'profile.post.what': what}});

			if((hh === null && mm === null) || (hh === '' && mm === ''))
				Meteor.users.update(Meteor.user()._id, {$set: {'profile.post.appointment': null}});
			else
				Meteor.users.update(Meteor.user()._id, {$set: {'profile.post.appointment': d}});

			Meteor.users.update(Meteor.user()._id, {$set: {'profile.post.location': location}});
      		Meteor.users.update(Meteor.user()._id, {$set: {'profile.post.locationName': locationName}});
	},
	'click #done': function() {
		$('#save').click();
		if(Meteor.user().profile.post)
		{
			if(Meteor.user().profile.post.targetTags && Meteor.user().profile.post.targetTags.length > 0)
			{
				if(Meteor.user().profile.post.what && Meteor.user().profile.post.what !== '')
				{
					if(Meteor.user().profile.post.appointment)
					{
						if(Meteor.user().profile.post.locationName)
						{
							$('.modal').modal('hide');
							Meteor.users.update(Meteor.user()._id, {$set: {'profile.havepost': true}});
							Posts.insert({
								userId: Meteor.user()._id,
							});

							Router.go('/');
						}
						else
							Session.set('postError', "Please finish where part of the post!");
					}
					else
						Session.set('postError', "Please finish appointment time of the post!");
				}
				else
					Session.set('postError', "Please finish what part of the post!");		
			}
			else
				Session.set('postError', "Please finish aim targets of the post!");
		}
		else
			Session.set('postError', "Please finish all parts of the post!");
	}
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

					/* Stupid away to avoid double click bug */
					$('#matches').show();
					$('#search').blur();
					$('#matches').focus();
					$('#matches').blur();
					$('#search').focus();
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
};