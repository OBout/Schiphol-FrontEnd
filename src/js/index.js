// import style for webpack to spam it in the bundje.js
import '../../sass/index.scss';

// import external functions to show how that can be done
import {
    appendHtmlElementWithClass,
    appendHtmlElementWithClassAndText,
    appendHtmlElementWithClassAndPlaceholder
} from './htmlelementscreator';

// globalz
let flights;
let autocompleteResults;
const main = document.querySelector('main');

// general functions
const initJson = () => {
    // getting json file from server

    loadJSON((response) => {
        const actual_JSON = JSON.parse(response);
        flights = actual_JSON;
    });
};
const autocomplete = (vali) => {
    // autocomplete list

    let flights_return_after_search = [];
    for (let i = 0; i < flights.flights.length; i++) {
        let addToFlight = false;
        for (let val in flights.flights[i]) { 
            // little extra tuning needed here to make this more efficient it needs a break, no need to keep looping when hit
            const key = flights.flights[i][val].toLowerCase();
            if (key.indexOf(vali) != -1) {
                addToFlight = true;
            }
        }
        if (addToFlight === true) { // prevent doubles
            flights_return_after_search.push(flights.flights[i]);
        }
    }
    return flights_return_after_search;
};

const resetResults = () => {
    // clearing search results

    const element = document.getElementById('autocomplete-results');
    main.removeChild(element);
    autocompleteResults = appendHtmlElementWithClass('table', 'autocomplete-results', ['rw-table'], main);
};
const updateCheckValue = (e) => {
    // triggering empty search event or (x) button in the right of search field

    if (e.target.value.length < 4) {
        resetResults();
    }
};
const updateValue = (e) => {
    // triggered by some random updated value event

    if (e.target.value.length > 3) {
        // type ahead is valid, so "start spamming the news"

        let flights_return = [];

        try {
            // remove html child nodes the fastest way
            resetResults();
        } catch (error) {
            // no children, nothing to remove
        }

        const val = e.target.value;
        flights_return = autocomplete(val, flights);

        for (let i = 0; i < flights_return.length; i++) {
            // build result list

            const flight = flights_return[i];
            const hr = document.createElement('hr');
            autocompleteResults.appendChild(hr);
            const tr = document.createElement('tr');
            autocompleteResults.appendChild(tr);

            const flightSquare = document.createElement('table');
            flightSquare.classList.add('rw-table');
            tr.appendChild(flightSquare);

            // row table flight search header
            const row1 = document.createElement('tr');
            flightSquare.appendChild(row1);
            const flightHeader = document.createElement('th');
            row1.appendChild(flightHeader);
            flightHeader.colSpan = 2;
            flightHeader.appendChild(document.createTextNode(flight.flightNumber + ' ' + flight.airport));

            // second row flight search header
            const row2 = document.createElement('tr');
            flightSquare.appendChild(row2);
            const timeExLabel = document.createElement('td');
            timeExLabel.appendChild(document.createTextNode('Expected'));
            const timeEx = document.createElement('td');
            timeEx.appendChild(document.createTextNode(flight.expectedTime));
            row2.appendChild(timeExLabel);
            row2.appendChild(timeEx);

            // thirth row flight search header
            const row3 = document.createElement('tr');
            flightSquare.appendChild(row3);
            const timeOrgLabel = document.createElement('td');
            timeOrgLabel.appendChild(document.createTextNode('Original'));
            const timeOrg = document.createElement('td');
            timeOrg.appendChild(document.createTextNode(flight.originalTime));

            row3.appendChild(timeOrgLabel);
            row3.appendChild(timeOrg);

        }
        autocompleteResults.style.display = 'block';
    } else {
        try {
            // remove html child nodes the fastest way
            resetResults();
        } catch (error) {
            // no children, nothing to remove
        }
    }
};

const loadJSON = (callback) => {
    // load JSON from url and do callback function afterwards

    let flights_obj = new XMLHttpRequest();
    flights_obj.overrideMimeType("application/json");
    flights_obj.open('GET', 'json/flights.json', true);
    flights_obj.onreadystatechange = () => {
        if (flights_obj.readyState === 4 && flights_obj.status === 200) {
            callback(flights_obj.responseText);
        }
    };
    flights_obj.send(null);
};

const init = () => {
    // initializes all html
    
    initJson();
    appendHtmlElementWithClassAndText('div', 'pick-header', 'Schiphol SearchMyFlight', ['rw-heading-l'], main);
    appendHtmlElementWithClassAndText('div', 'pick-label', 'Pick a flight', ['rw-input-label'], main);
    const inputForTypeahead = appendHtmlElementWithClassAndPlaceholder('input', 'pick-flight-input', 'Search Flight on Airport, Number, Time, etc', ['rw-input-text'], main);

    autocompleteResults = appendHtmlElementWithClass('table', 'autocomplete-results', ['rw-table'], main);
    inputForTypeahead.onkeyup = updateValue;
    inputForTypeahead.type = "search";
    inputForTypeahead.onsearch = updateCheckValue;

};

// inits the entire app
init();
