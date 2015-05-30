if (Meteor.isClient) {
    Meteor.startup(function() {
      GoogleMaps.load({libraries: 'geometry,places' });
    });
}

Template.map.helpers({
    mapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        setTimeout(function() {
          google.maps.event.addDomListener(window, 'load', initialize);
        });
        // Map initialization options
        return {
          center: new google.maps.LatLng(32.881, -117.238),
          zoom: 15,
          zoomControl: true,
        };
      }
    }
});

function initialize() {
    map = GoogleMaps.maps.exampleMap.instance;
    var ucsd = map.center;
    var request = {
      location: ucsd,
      radius: 500,
      types: ['store']
    };

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK) {
      for(var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;

    var marker = new google.maps.Marker({
      draggable:true,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location,
      id: document._id
    });
    marker.setMap(map);

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    })
  }