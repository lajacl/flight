export class FlightsService {
  constructor ($http, $log, apiUrl) {
    'ngInject'
    this.$http = $http
    this.$log = $log
    this.apiUrl = apiUrl
  }
    errorMess = ''

    errorMessage () {
      return this.errorMess
    }

  getAllFlights () {
    return this.$http({
    method: 'GET',
    url: `${this.apiUrl}/flights`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json'
    }
  }).then((response) => {
    this.errorMess = ''
    return response.data
  }, (response) => {
    this.errorMess = 'Unable to show available flights at this time. Please try again later.'
  })
  }
}
