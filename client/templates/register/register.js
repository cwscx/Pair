Template.register.events({
	'submit form':function(e) {
		e.preventDefault();

		var email_address=$(e.target).find('[name=email_address]').val();
		var first_name=$(e.target).find('[name=first_name]').val();
		var last_name=$(e.target).find('[name=last_name]').val();
		var password=$(e.target).find('[name=password]').val();
		var re_password=$(e.target).find('[name=re-password]').val();

		Meteor.call("createNewUser", email_address, first_name, last_name, password, re_password);
	}
});