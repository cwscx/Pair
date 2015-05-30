if(Meteor.isSever)
{
	Meteor.publish('markers', function() {return Markers.find(); });
}