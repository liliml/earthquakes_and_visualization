// Section below is step 4 in the lab
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9zZS0xNjgiLCJhIjoiY202aWYxY3lsMDdxdjJpcHJoaHlmZzdiNiJ9.3wUanYJCI6409InuRs9e7A';

let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/navigation-night-v1', // style URL, is of navigation night
    zoom: 4.5, // starting zoom
    center: [265, 38] // starting center
});

// Below is step 5 in the lab
async function geojsonFetch() { 
    // fetch geojson
    let response, nationalforests, capitals, usstates, table;
    response = await fetch('assets/FS_National_Forests.geojson');
    nationalforests = await response.json();
    response = await fetch('assets/capitals.geojson');
    capitals = await response.json();
    response = await fetch('assets/us-states.json');
    usstates = await response.json();


    // Below is step 6 in the lab
    //load data to the map as new layers and table on the side.
    map.on('load', function loadingData() {
        map.addSource('usstates', {
            type: 'geojson',
            data: usstates
        });
    
        map.addLayer({
            'id': 'usstates-layer',
            'type': 'fill',
            'source': 'usstates',
            'paint': {
                'fill-color': '#A020F0', // purple color fill
                'fill-opacity': 0.5
            }
        });
    
        map.addSource('nationalforests', {
            type: 'geojson',
            data: nationalforests
        });
    
        map.addLayer({
            'id': 'nationalforests-layer',
            'type': 'fill',
            'source': 'nationalforests',
            'paint': {
                'fill-color': 'green', // green color fill
                'fill-opacity': 1
            }
        });
    
        map.addSource('capitals', {
            type: 'geojson',
            data: capitals
        });
    
        map.addLayer({
            'id': 'capitals-layer',
            'type': 'circle',
            'source': 'capitals',
            'paint': {
                'circle-radius': 8,
                'circle-stroke-width': 2,
                'circle-color': 'blue',
                'circle-stroke-color': 'white'
            }
        });

        // map.addLayer({
        //     'id': 'capitals-labels',
        //     'type': 'symbol',
        //     'source': 'capitals',
        //     'paint': {
        //         'symbol-placement':'point',
        //         'text-anchor':'center',
        //         'text-color':'white'
        //         // 'text-fields'
        //     }
        // });
        
    
    });
    
    // step 7 in the lab
    table = document.getElementsByTagName("table")[0];
    let row, cell1, cell2, cell3;
    for (let i = 0; i < nationalforests.features.length; i++) {
        // Create an empty <tr> element and add it to the 1st position of the table:
        row = table.insertRow(-1);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        cell1.innerHTML = nationalforests.features[i].properties.FORESTNAME;
        cell2.innerHTML = nationalforests.features[i].properties.OBJECTID;
        cell3.innerHTML = nationalforests.features[i].geometry.coordinates;
        // cell3.innerHTML = new Date(nationalforests.features[i].properties.time).toLocaleDateString(
            // "en-US");
    }
    
    // step 8 in the lab
    let btn = document.getElementsByTagName("button")[0]; //gets first button with tag button from the html, the 0 is for indexing purposes for if there is multiple buttons
    
    btn.addEventListener('click', sortTable);


};

// define the function to sort table
function sortTable(e) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementsByTagName("table")[0];
    //FOR TESTING: console.log(table)
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            //ORIGINAL: x = parseFloat(rows[i].getElementsByTagName("td")[0].innerHTML);
            //ORIGINAL: y = parseFloat(rows[i + 1].getElementsByTagName("td")[0].innerHTML);
            x = rows[i].getElementsByTagName("td")[0].innerHTML; //DO NOT NEED parseFloat here as it takes string and parses it into a float
            y = rows[i + 1].getElementsByTagName("td")[0].innerHTML; //0 is the table data index, aka the column number here, and we want first column aka index 0

            //FOR TESTING: console.log(x);
            //FOR TESTING: console.log(y);

            //check if the two rows should switch place:
            if (x.toLowerCase() > y.toLowerCase()) {
            //in line above, removed .innerHTML as was not needed and caused errors as would not even be able to reach/parse 
            //this if statement correctly, it thought toLowerCase was the issue, but .innerHTML was the issue. Not fully sure why it was unneeded though 
            //or why it caused issues, I think it was as we already had x and y, didn't need to attempt to grab the html again?

            // changed line above to this for alphabetical sorting, see this source: https://www.w3schools.com/howto/howto_js_sort_table.asp
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

geojsonFetch();

