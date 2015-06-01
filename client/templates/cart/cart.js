Template.cart.helpers({
	yourPost: function() {
		if(Meteor.user()._id === Meteor.user().profile.havepost.posterId)
			return true;
		else
			return false;
	},
	partnerPost: function() {
		if(Meteor.user()._id === Meteor.user().profile.havepost.partnerId)
			return true;
		else
			return false;
	},
	havePossiblePartners: function() {
		if(Meteor.user().profile.havepost)
		{
			if(Meteor.user()._id === Meteor.user().profile.havepost.posterId)
			{
				var post = Posts.findOne(Meteor.user().profile.havepost._id);
				if(post)
				{
					if(post.partnerIds)
						return true
					else
						return false;
				}
				else
					return false;
			}
			else
				return false;
		}
		else
			return false;
	},
	possiblePartners: function() {
		if(Meteor.user().profile.havepost)
		{
			if(Meteor.user()._id === Meteor.user().profile.havepost.posterId)
			{
				if(Posts.findOne(Meteor.user().profile.havepost._id).partnerIds)
					return Posts.findOne(Meteor.user().profile.havepost._id).partnerIds;
			}
		}
	},
	possiblePartnerNames: function() {
		return Meteor.users.findOne({_id: String(this)}).username;
	},
	havePartner: function() {
		if(Meteor.user()._id === Meteor.user().profile.havepost.posterId)
		{
			if(Meteor.user().profile.havepost.partnerId !== null)
				return true;
			else 
				return false;
		}
		else
			return false;
	},
	posterName: function() {
		if(Meteor.user()._id === Meteor.user().profile.havepost.partnerId)
		{
			return Meteor.users.findOne(Meteor.user().profile.havepost.posterId).username;
		}
	},
	partnerName: function() {
		if(Meteor.user()._id === Meteor.user().profile.havepost.posterId)
		{
			var partnerId = Meteor.user().profile.havepost.partnerId;
			if(partnerId)
			{
				var partner = Meteor.users.findOne(partnerId);
				if(partner)
					return partner.username;
			}
		}
	},
	userTags: function() {
		var tags = [];
		var user = Meteor.users.findOne(Meteor.user().profile.havepost.posterId);
		
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
		var user = Meteor.users.findOne(Meteor.user().profile.havepost.posterId);
		return user.profile.post.what;
	},
	targetTags: function() {
		var user = Meteor.users.findOne(Meteor.user().profile.havepost.posterId);
		return user.profile.post.targetTags;
	},
	hr: function() {
		var curD = new Date();
		var user = Meteor.users.findOne(Meteor.user().profile.havepost.posterId);
		var appointment = user.profile.post.appointment;

		var difHr = appointment.getHours() - curD.getHours();
	    var difMin = appointment.getMinutes() - curD.getMinutes();
	    difTime = difHr * 60 + difMin;

	    if(difTime <= 0)
	    {
			$("#cartList").slideUp('slow');
			$("#cartList").attr('name', "hideList");
			Meteor.call('deletePost', Meteor.user()._id, Meteor.user().profile.havepost._id);
		}

		return Math.floor(difTime / 60);
	},
	min: function() {
		var curD = new Date();
		var user = Meteor.users.findOne(Meteor.user().profile.havepost.posterId);
		var appointment = user.profile.post.appointment;

		var difHr = appointment.getHours() - curD.getHours();
	    var difMin = appointment.getMinutes() - curD.getMinutes();
	    difTime = difHr * 60 + difMin;
		
		return difTime % 60;
	},
	where: function() {
		var user = Meteor.users.findOne(Meteor.user().profile.havepost.posterId);
		return user.profile.post.locationName;
	}
});

Template.cart.events({
	'click #cart': function() {
		var name = document.getElementById("cartList").getAttribute('name');

		if(name === 'showList')
		{
			$("#cartList").slideUp('slow');
			$("#cartList").attr('name', "hideList");
		}
		else if(name === 'hideList')
		{
			$("#cartList").slideDown('slow');
			$("#cartList").attr('name', "showList");
		}
	},
	'click #closeButton': function() {
		$("#cartList").attr('name', "hideList");
		$("#cartList").slideUp('slow', function() {
			if(Meteor.user()._id === Meteor.user().profile.havepost.posterId)
				Meteor.call('posterDeletePost', Meteor.user().profile.havepost.posterId, Meteor.user().profile.havepost.partnerId, Meteor.user().profile.havepost._id);
			else if(Meteor.user()._id === Meteor.user().profile.havepost.partnerId)
				Meteor.call('partnerDeletePost', Meteor.user().profile.havepost.posterId, Meteor.user().profile.havepost.partnerId, Meteor.user().profile.havepost._id);
		});
	},
	'click .glyphicon-ok': function() {
		var partnerId = String(this);
		Meteor.call('addPartner', Meteor.user()._id, partnerId, Meteor.user().profile.havepost._id);
	},
	'click .glyphicon-remove': function() {
		var partnerId = String(this);
		var postId = Meteor.user().profile.havepost._id;
		Meteor.call('removePossiblePartner', partnerId, postId);
	},
});

Template.cart.rendered = function() {
	$(function() {
		$('#cartList').hide().delay(500).slideDown('slow');
	});
}

Meteor.subscribe('postUsers');


