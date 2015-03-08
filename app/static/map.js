var directionsDisplay;
var map;

var locations = [
  ['Starbucks 684 Avenue of the Americas', 40.741843, -73.993232, 4],
  ['Starbucks 41 Union Square W', 40.7371162, -73.9906153, 5],
  ['Starbucks 304 Park Ave S', 40.7400682, -73.9868082, 3],
  ['Starbucks 10 Union Square E', 40.7348529, -73.9897794, 2],
  ['Starbucks 510 Avenue of the Americas', 40.7368034, -73.9968884, 1]
];


var infowindow = new google.maps.InfoWindow();

var marker, i;
function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 10,
    center: new google.maps.LatLng(40.7033127,-73.979681),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      };
    })(marker, i));
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
