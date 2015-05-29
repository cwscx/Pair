Template.tagnav.events({
	'click #gender': function() {
		Session.set('selectedTag', 'gender');
		$('li').removeClass('tab-current');
		$('#genderLi').addClass('tab-current');
	},
	'click #standing': function() {
		if(Meteor.user().profile.gender)
		{
			Session.set('selectedTag', 'standing');
			Session.set('selectError', '');
			$('li').removeClass('tab-current');
			$('#standingLi').addClass('tab-current');
		}
		else
		{
			Session.set('selectError', 'Gender is not selected!');
		}
	},
	'click #majors': function() {
		if(!Meteor.user().profile.gender)
		{
			Session.set('selectError', 'Gender is not selected!');
		}
		else if(!Meteor.user().profile.standing)
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
	'click #interests': function() {
		if(!Meteor.user().profile.gender)
		{
			Session.set('selectError', 'Gender is not selected!');
		}
		else if(!Meteor.user().profile.standing)
		{
			Session.set('selectError', 'Standing is not selected!');
		}
		else if(!Meteor.user().profile.majors)
		{
			Session.set('selectError', 'Major is not selected!');
		}
		else
		{
			Session.set('selectedTag', 'interests');
			Session.set('selectError', '');
			$('li').removeClass('tab-current');
			$('#interestsLi').addClass('tab-current');
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
			$('.tabs').fadeOut(800, function() {
				Meteor.users.update(Meteor.user()._id, {$set: {'profile.firstTimeUser': false}});
				Router.go('/');
			});
		}	
	},
});

Template.tagnav.helpers({
	errorMessage: function() {return Session.get('selectError');},
	genderSelected: function() {
		if(Session.get('selectedTag') === 'gender')
			return true;
		else
			return false;
	},
	standingSelected: function() {
		if(Session.get('selectedTag') === 'standing')
			return true;
		else
			return false;
	},
	majorsSelected: function() {
		if(Session.get('selectedTag') === 'majors')
			return true;
		else
			return false;
	},
	interestsSelected: function() {
		if(Session.get('selectedTag') === 'interests')
			return true;
		else
			return false;
	},
});

Template.tagnav.rendered = function() {
	$(function() {
		$('.tabs').hide().fadeIn(800);
	});
};