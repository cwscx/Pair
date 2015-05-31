Template.postItem.helpers({
	username: function() {
		var user = Meteor.users.findOne(this.userId);
		return user.username;
	},
	userTags: function() {
		var tags = [];
		var user = Meteor.users.findOne(this.userId);
		
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
		var user = Meteor.users.findOne(this.userId);
		return user.profile.post.what;
	},
	targetTags: function() {
		var user = Meteor.users.findOne(this.userId);
		return user.profile.post.targetTags;
	},
	hr: function() {
		var curD = new Date();
		var user = Meteor.users.findOne(this.userId);
		var appointment = user.profile.post.appointment;

		var difHr = appointment.getHours() - curD.getHours();
	    var difMin = appointment.getMinutes() - curD.getMinutes();
	    difTime = difHr * 60 + difMin;

		return Math.floor(difTime / 60);
	},
	min: function() {
		var curD = new Date();
		var user = Meteor.users.findOne(this.userId);
		var appointment = user.profile.post.appointment;

		var difHr = appointment.getHours() - curD.getHours();
	    var difMin = appointment.getMinutes() - curD.getMinutes();
	    difTime = difHr * 60 + difMin;
		
		return difTime % 60;
	},
	where: function() {
		var user = Meteor.users.findOne(this.userId);
		return user.profile.post.locationName;
	}
});

Meteor.subscribe('postUsers');