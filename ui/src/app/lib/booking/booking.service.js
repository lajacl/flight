export class BookingService {
  constructor($q, localStorageService, $http, $log, $state, apiUrl) {
    'ngInject'
    this.$q = $q
    this.localStorageService = localStorageService
    this.$http = $http
    this.$log = $log
    this.$state = $state
    this.apiUrl = apiUrl
  }

  helpMessage = ''

  getHelpMessage() {
    return this.helpMessage
  }

  getLocations() {
    return this.$http({
      method: 'GET',
      url: `${this.apiUrl}/locations`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.data
    }, (response) => {
      this.helpMessage = 'Unable to search flights at this time. Please try again later.'
    })
  }

  searchFlights(origin, destination) {
    typeof (origin)
    return this.$http({
      method: 'GET',
      url: `${this.apiUrl}/flights/search`,
      params: { origin: origin, destination: destination },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.data
    }, (response) => {
    })
  }

  bookFlight(accountId, flights) {
    let itinerary = { flights: flights }
    return this.$http({
      method: 'POST',
      url: `${this.apiUrl}/account/book`,
      params: { id: accountId },
      data: itinerary
    }).then((response) => {
      return response.data
    }, (response) => {
      this.helpMessage = "Unable to book flight at this time. Please try again later."
    })
  }

}
