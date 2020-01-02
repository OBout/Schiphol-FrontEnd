export function autocomplete (vali) {
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

export function resetResults () {
    // clearing search results

    const element = document.getElementById('autocomplete-results');
    main.removeChild(element);
    autocompleteResults = appendHtmlElementWithClass('table', 'autocomplete-results', ['rw-table'], main);
};
export function updateCheckValue (e) {
    // triggering empty search event or (x) button in the right of search field

    if (e.target.value.length < 4) {
        resetResults();
    }
};
export function updateValue = (e)  {
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