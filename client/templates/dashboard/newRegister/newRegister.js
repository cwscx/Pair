Template.newRegister.helpers({
	tagsStart: function() {return Session.get('introFinished') === true;},
});