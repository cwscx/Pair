Template.tagnav.events({
	'click #gender': function() {
		Session.set('selectedTag', 'gender');
	},
	'click #standing': function() {
		Session.set('selectedTag', 'standing');
	},
	'click #majors': function() {
		Session.set('selectedTag', 'majors');
	},
	'click #interests': function() {
		Session.set('selectedTag', 'interests');
	},
	'click #others': function() {
		Session.set('selectedTag', 'others');
	},
});

Template.tagnav.helpers({
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
	othersSelected: function() {
		if(Session.get('selectedTag') === 'others')
			return true;
		else
			return false;
	},
});