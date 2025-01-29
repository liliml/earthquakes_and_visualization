// Section below is step 4 in the lab
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9zZS0xNjgiLCJhIjoiY202aWYxY3lsMDdxdjJpcHJoaHlmZzdiNiJ9.3wUanYJCI6409InuRs9e7A';

let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    zoom: 5.5, // starting zoom
    center: [138, 38] // starting center
});

// Below is step 5 in the lab
async function geojsonFetch() { 
    // fetch geojson
    let response, earthquakes, japan, table;
    response = await fetch('assets/earthquakes.geojson');
    earthquakes = await response.json();
    response = await fetch('assets/japan.json');
    japan = await response.json();
 };

geojsonFetch();

// Below is step 6 in the lab
//load data to the map as new layers and table on the side.
map.on('load', function loadingData() {

    map.addSource('earthquakes', {
        type: 'geojson',
        data: earthquakes
    });

    map.addLayer({
        'id': 'earthquakes-layer',
        'type': 'circle',
        'source': 'earthquakes',
        'paint': {
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-color': 'red',
            'circle-stroke-color': 'white'
        }
    });


    map.addSource('japan', {
        type: 'geojson',
        data: japan
    });

    map.addLayer({
        'id': 'japan-layer',
        'type': 'fill',
        'source': 'japan',
        'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
        }
    });

});