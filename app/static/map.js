/**
 * Get Current Location
 */
function displayPosition(position) {
  console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);

  initialize({"latitude": position.coords.latitude, "longitude": position.coords.longitude});
}

function displayError(error) {
  var errors = { 
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}

if (navigator.geolocation) {
  var timeoutVal = 10 * 1000 * 1000;
  navigator.geolocation.getCurrentPosition(
    displayPosition, 
    displayError,
    { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
  );
}
else {
  alert("Geolocation is not supported by this browser");
}

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

var crowdData = [
  {
    "time": "2015-03-08T15:00:00Z", 
    "locations": {
      "1": 3,
      "2": 2,
      "3": 5,
      "4": 1,
      "5": 2
    }
  }
];


var infowindow = new google.maps.InfoWindow();

var marker, i;

var markers = [];

function plotLocations(locations, map) {
  var location;

  var popInfoWindow = function(marker, location) {
      return function () {
        var contentString = "<div>" + 
              "<p><b>" + location.name + "</b></p>" + 
              "<p>Crowd Level: " + mostRecentData[location.id] + "</p>" +
              "</div>";
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
      };
  };

  for (i = 0; i < locations.length; i++) {
    location = locations[i];

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(location.coordinate.lat, location.coordinate.lng),
      map: map
    });

    markers.push(marker);

    var mostRecentData = crowdData[0].locations;

    google.maps.event.addListener(marker, 'click', popInfoWindow(marker, location));
  }

  // Open the least crowded one
  popInfoWindow(markers[0], locations[0])();
}

function initialize(coordinate) {
  var a = {
    "latitude": 40.7033127,
    "longitude": -73.979681
  };

  if (coordinate) {
    a = coordinate;
  }

  console.log(a);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 12,
    center: new google.maps.LatLng(a.latitude, a.longitude),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  plotLocations(locations, map);
}

google.maps.event.addDomListener(window, 'load', initialize);
