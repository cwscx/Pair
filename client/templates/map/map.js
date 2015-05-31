if (Meteor.isClient) {
    Meteor.startup(function() {
      GoogleMaps.load({libraries: 'geometry,places' });
    });
}

Template.map.events({
  'change #where':function() {
    var keyword = $('#where').val();
    if(keyword === '')
    {
      Session.set('location',null);
      Session.set('locationName', null);
    }
    else
      Session.set('keyword', keyword);
  },
});

Template.map.helpers({
    mapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        if(Session.get('locationName'))
          $('#where').val(Session.get('locationName'));

        var input = document.getElementById('where');
        google.maps.event.addDomListener(input, 'change', initialize);
        // Map initialization options
        return {
          center: new google.maps.LatLng(32.881, -117.238),
          zoom: 14,
          zoomControl: true,
        };
      }
    },
});

var markers = [];

function initialize() {
    setTimeout(function () {
      for(var i = 0; i < markers.length; i++)
      {
        markers[i].setMap(null);
      }

      map = GoogleMaps.maps.exampleMap.instance;
      var ucsd = map.center;
      var key = Session.get('keyword');
      console.log(key);
      var request = {
        location: ucsd,
        radius: 2500,
        keyword: key,
      };

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    }, 200);
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
    });
    marker.setMap(map);
    markers.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    })

    google.maps.event.addListener(marker, 'dblclick', function() {
      Session.set('location', marker.position);
      Session.set('locationName', place.name);
      $('#where').val(place.name);

      for(var i = 0; i < markers.length; i++)
      {
        markers[i].setMap(null);
      }
      marker.setMap(map);
    })
}