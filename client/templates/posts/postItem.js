Template.postItem.helpers({
	pairError: function() {
		return Session.get('pairError');
	},
	username: function() {
		var user = Meteor.users.findOne(this.posterId);
		return user.username;
	},
	userTags: function() {
		var tags = [];
		var user = Meteor.users.findOne(this.posterId);
		
		tags.push(user.profile.gender);
		tags.push(user.profile.standing);
		for(var i = 0; i < user.profile.majors.length; i++)
		{
			tags.push(user.profile.majors[i]);
		}

		for(var i = 0; i < user.profile.interests.length; i++)
		{
			tags.push(user.profile.interests[i]);
		}

		return tags;
	},
	what: function() {
		var user = Meteor.users.findOne(this.posterId);
		return user.profile.post.what;
	},
	targetTags: function() {
		var user = Meteor.users.findOne(this.posterId);
		return user.profile.post.targetTags;
	},
	hr: function() {
		var curD = new Date();
		var user = Meteor.users.findOne(this.posterId);
		var appointment = user.profile.post.appointment;

		var difHr = appointment.getHours() - curD.getHours();
	    var difMin = appointment.getMinutes() - curD.getMinutes();
	    difTime = difHr * 60 + difMin;

		return Math.floor(difTime / 60);
	},
	min: function() {
		var curD = new Date();
		var user = Meteor.users.findOne(this.posterId);
		var appointment = user.profile.post.appointment;

		var difHr = appointment.getHours() - curD.getHours();
	    var difMin = appointment.getMinutes() - curD.getMinutes();
	    difTime = difHr * 60 + difMin;
		
		return difTime % 60;
	},
	where: function() {
		var user = Meteor.users.findOne(this.posterId);
		return user.profile.post.locationName;
	}
});

Template.postItem.events({
	'click #pair': function() {
		Session.set('pairError', null);

		if(Meteor.user())
		{
			if(Meteor.user()._id === this.posterId)
				Session.set('pairError', "You cannot pair with yourself!");
			else
				Meteor.call("addPossiblePartner", Meteor.user()._id, this._id)
		}
	},
});

Meteor.subscribe('postUsers');