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

  searchFlights (origin, destination, flights) {
    this.$log.log('serviceData: ' + origin + ' ' + destination)
    let selectFlights = []
    for (let i = 0; i < flights.length; i++) {
      this.$log.log('Current flight: ' + flights[i].origin + ' to ' + flights[i].destination)
      if (flights[i].origin === origin.toUpperCase()) {
        if (flights[i].destination === destination.toUpperCase()) {
          selectFlights.push(flights[i])
        }
      }
    }
    this.$log.log('# Selected Flights: ' + selectFlights.length)
    // this.$log.log('Select flights: ' + selectFlights[0].origin + ' ' + selectFlights[0].destination)
    return selectFlights
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
    let method = 'GET'
    let apiUrl = 'http://localhost:8000/flights'

    return this.$http({
      method: method,
      url: apiUrl,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.data
    }, (response) => {
    })
  }

}
