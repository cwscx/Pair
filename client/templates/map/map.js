if (Meteor.isClient) {
    Meteor.startup(function() {
      GoogleMaps.load();
    });
}

Template.map.helpers({
    mapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(32.881, -117.238),
          zoom: 16,
          zoomControl: true,
        };
      }
    }
});

