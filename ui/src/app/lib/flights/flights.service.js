export class FlightsService {
  constructor ($http, $log) {
    'ngInject'
    this.$http = $http
    this.$log = $log
  }
    errorMess = ''

    errorMessage () {
      return this.errorMess
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
