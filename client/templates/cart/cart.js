Template.cart.helpers({
	yourPost: function() {
		if(Meteor.user()._id === Meteor.user().profile.post.posterId)
			return true;
		else
			return false;
	},
})