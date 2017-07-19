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

  searchFlights (origin, destination) {

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
