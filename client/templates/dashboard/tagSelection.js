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
	},
});

Template.standingSelection.helpers({
	standing: function() {return Standings.find()},
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
	}
});

Meteor.subscribe('gender');
Meteor.subscribe('standing');