Template.register.events({
	'submit form':function(e) {
		e.preventDefault();

		var email_address=$(e.target).find('[name=email_address]').val();
		var username=$(e.target).find('[name=username]').val();
		var password=$(e.target).find('[name=password]').val();
		var re_password=$(e.target).find('[name=re-password]').val();

		Meteor.call("createNewUser", email_address, username, password, re_password, 
			function(error, result) {
				if(error){
					alert(error);
				}else
					Router.go("registerSuccess");
				});
	}
});