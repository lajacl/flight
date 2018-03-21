export class FlightsService {
  constructor ($http, $log, apiUrl) {
    'ngInject'
    this.$http = $http
    this.$log = $log
    this.apiUrl = apiUrl
  }
    helpMessage = ''

    getHelpMessage () {
      return this.helpMessage
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
    this.helpMessage = ''
    return response.data
  }, (response) => {
    this.helpMessage = 'Unable to show available flights at this time. Please try again later.'
  })
  }
}
