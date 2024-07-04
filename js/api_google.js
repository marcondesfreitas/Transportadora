let map, directionsService, directionsRenderer;

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    directionsRenderer.setMap(map);

    const originInput = document.getElementById('origin-input');
    const destinationInput = document.getElementById('destination-input');

    const originAutocomplete = new google.maps.places.Autocomplete(originInput);
    originAutocomplete.setFields(['place_id']);

    const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
    destinationAutocomplete.setFields(['place_id']);

    document.getElementById('calculate-route').addEventListener('click', () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer, originAutocomplete, destinationAutocomplete);
    });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, originAutocomplete, destinationAutocomplete) {
    const originPlaceId = originAutocomplete.getPlace().place_id;
    const destinationPlaceId = destinationAutocomplete.getPlace().place_id;

    if (!originPlaceId || !destinationPlaceId) {
        alert('Please select both an origin and a destination.');
        return;
    }

    directionsService.route(
        {
            origin: { 'placeId': originPlaceId },
            destination: { 'placeId': destinationPlaceId },
            travelMode: google.maps.TravelMode.DRIVING
        },
        (response, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            } else {
                alert('Directions request failed due to ' + status);
            }
        }
    );
}
