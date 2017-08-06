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
    let selectFlights = []
    let tempFlights = []
    for (let i = 0; i < flights.length; i++) {
      // tempFlights = []
      this.$log.log('Current flight: ' + flights[i].origin + ' to ' + flights[i].destination)
      if (flights[i].origin === origin.toUpperCase()) {
        tempFlights = [flights[i]]
        if (flights[i].destination === destination.toUpperCase()) {
        selectFlights.push(tempFlights)
        console.log(selectFlights)
        } else {
          let origin2 = flights[i].destination
          for (let j = 0; j < flights.length; j++) {
            if ((flights[j].origin === origin2.toUpperCase()) && (flights[j].destination === destination.toUpperCase())) {
              tempFlights.push(flights[j])
              selectFlights.push(tempFlights)
                // tempFlights = [flights[i]]
              console.log(selectFlights)
            }
          }
        }
      }
    }
    this.$log.log('# Selected Flights: ' + selectFlights.length)
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
