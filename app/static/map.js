var directionsDisplay;
var map;

var locations = [
  { 
    "id": 5,
    "name": "Starbucks 684 Avenue of the Americas",
    "coordinate": { "lat": 40.741843, "lng": -73.993232 },
  },
  { 
    "id": 4,
    "name": "Starbucks 41 Union Square W",
    "coordinate": { "lat": 40.7371162, "lng": -73.9906153 }
  },
  { 
    "id": 3,
    "name": "Starbucks 304 Park Ave S",
    "coordinate": { "lat": 40.7400682, "lng": -73.9868082 }
  },
  { 
    "id": 2,
    "name": "Starbucks 10 Union Square E",
    "coordinate": { "lat": 40.7348529, "lng": -73.9897794 }
  },
  { 
    "id": 1,
    "name": "Starbucks 510 Avenue of the Americas",
    "coordinate": { "lat": 40.7368034, "lng": -73.9968884 }
  }
];


var infowindow = new google.maps.InfoWindow();

var marker, i;

function plotLocations(locations, map) {
  var location;
  for (i = 0; i < locations.length; i++) {
    location = locations[i];

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(location.coordinate.lat, location.coordinate.lng),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(location.name);
        infowindow.open(map, marker);
      };
    })(marker, i));
  }
}

function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 10,
    center: new google.maps.LatLng(40.7033127,-73.979681),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  plotLocations(locations, map);
}

google.maps.event.addDomListener(window, 'load', initialize);
