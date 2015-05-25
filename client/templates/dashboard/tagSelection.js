Template.genderSelection.helpers({
	gender: function() {return Genders.find()},
});

Template.genderSelection.events({
	'click .btn': function() {
		/* Count the current tag number, if the target tag is not selected before,
		 * increase the tag number */
		var count = Meteor.user().profile.tagsNumber;
		if(!Meteor.user().profile.gender)
		{
			var count = count + 1;
		}

        /* Get current tag id, found it in the collection and update */
		var tagId = this._id;
		var g = Genders.find(tagId).fetch()[0].discription;
		Meteor.users.update(Meteor.user()._id, {$set: {'profile.gender': g}});
		Meteor.users.update(Meteor.user()._id, {$set: {'profile.tagsNumber': count}});
		Session.set('selectError', '');
	},
	'click #next': function() {
		if(!Meteor.user().profile.gender)
		{
			Session.set('selectError', 'Gender is not selected!');
		}
		else
		{
			Session.set('selectedTag', 'standing');
			Session.set('selectError', '');
			$('li').removeClass('tab-current');
			$('#standingLi').addClass('tab-current');
		}
	},
});

Template.standingSelection.helpers({
	standing: function() {
		return Standings.find()
	},
});
	
Template.standingSelection.events({
	'click .btn': function() {
		var count = Meteor.user().profile.tagsNumber;
		if(!Meteor.user().profile.standing)
		{
			var count = count + 1;
		}

		var tagId = this._id;
		var s = Standings.find(tagId).fetch()[0].discription;
		Meteor.users.update(Meteor.user()._id, {$set: {'profile.standing': s}});
		Meteor.users.update(Meteor.user()._id, {$set: {'profile.tagsNumber': count}});	
	},
	'click #next': function() {
		if(!Meteor.user().profile.standing)
		{
			Session.set('selectError', 'Standing is not selected!');
		}
		else
		{
			Session.set('selectedTag', 'majors');
			Session.set('selectError', '');
			$('li').removeClass('tab-current');
			$('#majorsLi').addClass('tab-current');
		}
	},
});

Template.majorsSelection.helpers({
	engineeringMajor: function() {return Majors.find({category: "Engineering"});},
	socialMajor: function() {return Majors.find({category: "Social Science"});},
	scienceMajor: function() {return Majors.find({category: "Science"});},
	medMajor: function() {return Majors.find({category: "Medical"});},
	busMajor: function() {return Majors.find({category: "Business"});},
});

Template.majorsSelection.events({
	'click .btn': function() {
		var count = Meteor.user().profile.tagsNumber;

		var tagId = this._id;
		var m = Majors.find(tagId).fetch()[0].discription;

		if(Meteor.user().profile.majors)
		{
			var majors = Meteor.user().profile.majors;
		
			if(majors.length >= 3){
				Session.set('selectError', 'You have four majors?');
			}
			else
			{
				if(majors.indexOf(m) === -1)
				{
					majors.push(m);
					Meteor.users.update(Meteor.user()._id, {$set: {'profile.majors': majors}});
					
					count++;
					Meteor.users.update(Meteor.user()._id, {$set: {'profile.tagsNumber': count}});
					Session.set('selectError', '');
				}
			}
		}
		else
		{
			var majors = [];
			majors.push(m);
			Meteor.users.update(Meteor.user()._id, {$set: {'profile.majors': majors}});
			
			count++;
			Meteor.users.update(Meteor.user()._id, {$set: {'profile.tagsNumber': count}});
			Session.set('selectError', '');
		}
	},
	'click #next': function() {
		if(!Meteor.user().profile.majors)
		{
			Session.set('selectError', 'You should select at least one major!');
		}
		else
		{
			Session.set('selectedTag', 'interests');
			Session.set('selectError', '');
			$('li').removeClass('tab-current');
			$('#interestsLi').addClass('tab-current');
		}	
	},
	'click #self': function() {
		bootbox.prompt({
			title: 'Write your major here!',
			size: 'small',
			message: "Please define your major here!",
			callback: function(result) {
				if(result === null || result === "")
				{
					Session.set('selectError', 'Please enter your major!');
				}
				else
				{	
					var count = Meteor.user().profile.tagsNumber;

					if(Meteor.user().profile.majors)
					{
						var majors = Meteor.user().profile.majors;
					
						if(majors.length >= 3){
							Session.set('selectError', 'You have four majors?');
						}
						else
						{
							if(majors.indexOf(result) === -1)
							{
								majors.push(result);
								Meteor.users.update(Meteor.user()._id, {$set: {'profile.majors': majors}});
								count++;
								Meteor.users.update(Meteor.user()._id, {$set: {'profile.tagsNumber': count}});
								Session.set('selectError', '');
							}
						}
					}
					else
					{
						var majors = [];
						majors.push(result);
						Meteor.users.update(Meteor.user()._id, {$set: {'profile.majors': majors}});

						count++;
						Meteor.users.update(Meteor.user()._id, {$set: {'profile.tagsNumber': count}});
						Session.set('selectError', '');
					}
				}
			},
		});
	},
});

Template.interestsSelection.helpers({
	sport: function() {return Interests.find({category: "Sports"});},
	casualty: function() {return Interests.find({category: "Casualty"});},
});

Template.interestsSelection.events({
	'click .btn': function() {
		var count = Meteor.user().profile.tagsNumber;

		console.log("xxxx");

		var tagId = this._id;
		var i = Interests.find(tagId).fetch()[0].discription;

		if(Meteor.user().profile.interests)
		{
			var interests = Meteor.user().profile.interests;
		
			if(interests.length >= 5){
				Session.set('selectError', 'Try to limit your interests less than 5!');
			}
			else
			{
				if(interests.indexOf(i) === -1)
				{
					interests.push(i);
					Meteor.users.update(Meteor.user()._id, {$set: {'profile.interests': interests}});
					
					count++;
					Meteor.users.update(Meteor.user()._id, {$set: {'profile.tagsNumber': count}});
					Session.set('selectError', '');
				}
			}
		}
		else
		{
			var interests = [];
			interests.push(i);
			Meteor.users.update(Meteor.user()._id, {$set: {'profile.interests': interests}});
			
			count++;
			Meteor.users.update(Meteor.user()._id, {$set: {'profile.tagsNumber': count}});
			Session.set('selectError', '');
		}
	},
	'click #done': function() {
		if(!Meteor.user().profile.interests)
		{
			Session.set('selectError', 'You should select at least one interest!');
		}
		else
		{
			Session.set('selectError', '');
		}	
	},
	'click #self': function() {
		bootbox.prompt({
			title: 'Write down your own interests!',
			size: 'medium',
			message: "Please write your interests here!",
			callback: function(result) {
				if(result === null || result === "")
				{
					Session.set('selectError', 'Please enter your interests!');
				}
				else
				{	
					var count = Meteor.user().profile.tagsNumber;

					if(Meteor.user().profile.interests)
					{
						var interests = Meteor.user().profile.interests;
					
						if(interests.length >= 5){
							Session.set('selectError', 'Try to limit your interests less than 5!');
						}
						else
						{
							if(interests.indexOf(result) === -1)
							{
								interests.push(result);
								Meteor.users.update(Meteor.user()._id, {$set: {'profile.interests': interests}});
								count++;
								Meteor.users.update(Meteor.user()._id, {$set: {'profile.tagsNumber': count}});
								Session.set('selectError', '');
							}
						}
					}
					else
					{
						var interests = [];
						interests.push(result);
						Meteor.users.update(Meteor.user()._id, {$set: {'profile.interests': interests}});

						count++;
						Meteor.users.update(Meteor.user()._id, {$set: {'profile.tagsNumber': count}});
						Session.set('selectError', '');
					}
				}
			},
		});
	},
});

Meteor.subscribe('gender');
Meteor.subscribe('standing');
Meteor.subscribe('major');
Meteor.subscribe('interests');