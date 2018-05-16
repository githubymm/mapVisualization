/*var cities = L.layerGroup();

	L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities),
	L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities),
	L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities),
	L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);


	var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

	var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
		streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

	var map = L.map('map', {
		center: [39.73, -104.99],
		zoom: 10,
		layers: [grayscale, cities]
	});

	var baseLayers = {
		"Grayscale": grayscale,
		"Streets": streets
	};

	var overlays = {
		"Cities": cities
	};

	L.control.layers(baseLayers, overlays).addTo(map);*/

	// Setup map
var map = L.map('map').setView([51.932994, 4.509373], 14);

// Setup tilelayer
L.tileLayer('http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade. Font Awesome by Dave Gandy',
  key: 'BC9A493B41014CAABB98F0471D759707',
  detectRetina: true
}).addTo(map);

// Add markers to map
// Font-Awesome markers
L.marker([51.941196, 4.512291], {
  icon: L.AwesomeMarkers.icon({
    icon: 'spinner',
    markerColor: 'red',
    prefix: 'fa',
    spin: true
  })
}).addTo(map);
L.marker([51.927913, 4.521303], {
  icon: L.AwesomeMarkers.icon({
    icon: 'coffee',
    markerColor: 'orange',
    prefix: 'fa',
    iconColor: 'black'
  })
}).addTo(map);
L.marker([51.936063, 4.502077], {
  icon: L.AwesomeMarkers.icon({
    icon: 'cog',
    prefix: 'fa',
    markerColor: 'purple',
    iconColor: '#6b1d5c'
  })
}).addTo(map);

// Glyphicons
L.marker([51.932835, 4.506969], {
  icon: L.AwesomeMarkers.icon({
    icon: 'star',
    prefix: 'glyphicon',
    markerColor: 'green'
  })
}).addTo(map);
L.marker([51.930295, 4.515209], {
  icon: L.AwesomeMarkers.icon({
    icon: 'certificate',
    prefix: 'glyphicon',
    markerColor: 'blue'
  })
}).addTo(map);
L.marker([51.930083, 4.507742], {
  icon: L.AwesomeMarkers.icon({
    icon: 'cog',
    prefix: 'glyphicon',
    markerColor: 'cadetblue'
  })
}).addTo(map);
