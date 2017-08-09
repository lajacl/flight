export class BookingService {
  constructor ($q, localStorageService, $http, $log, $state) {
    'ngInject'
    this.$q = $q
    this.localStorageService = localStorageService
    this.$http = $http
    this.$log = $log
    this.$state = $state
  }

  errorMess = ''

  errorMessage () {
    return this.errorMess
  }

  getLocations () {
    return this.$http({
      method: 'GET',
      url: 'http://localhost:8000/location',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.data
    }, (response) => {
    })
  }

  getAllFlights () {

    return this.$http({
      method: 'GET',
      url: 'http://localhost:8000/flights',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.data
    }, (response) => {
    })
  }

  searchFlights (origin, destination, flights) {
    let selectFlights = []
    let tempFlights = []
    for (let i = 0; i < flights.length; i++) {
      // tempFlights = []
      this.$log.log('Current flight: ' + flights[i].origin + ' to ' + flights[i].destination)
      if (flights[i].origin === origin.toUpperCase()) {
        tempFlights = [flights[i]]
        if (flights[i].destination === destination.toUpperCase()) {
        selectFlights.push(tempFlights)
        } else {
          let origin2 = flights[i].destination
          for (let j = 0; j < flights.length; j++) {
            if ((flights[j].origin === origin2.toUpperCase()) &&
              (flights[j].destination === destination.toUpperCase()) &&
              (flights[j].offset > (flights[i].offset + flights[i].flightTime))) {
              tempFlights.push(flights[j])
              selectFlights.push(tempFlights)
              tempFlights = [flights[i]]
            }
          }
        }
      }
    }
    tempFlights = []
    console.log(selectFlights)
    this.$log.log('# Selected Flights: ' + selectFlights.length)
    return selectFlights
  }

  bookFlight (accountId, flights) {
    let itinerary = {flights: flights}
    // console.log(itinerary)
    return this.$http({
      method: 'POST',
      url: 'http://localhost:8000/flight/account/book',
      params: {id: accountId},
      data: itinerary
    }).then((response) => {
      this.$log.log('Book Flight Response Data: ' + response.data)
      return response.data
    }, (response) => {
      this.errorMess="Unable to book flight at this time. Please try again later."
    })
  }

}
