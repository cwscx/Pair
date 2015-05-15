Template.newRegister.helpers({
	introStart: function() {return Session.get('introFinished') === false;},
});