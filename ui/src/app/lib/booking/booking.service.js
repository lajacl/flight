export class BookingService {
  constructor ($q, localStorageService, $http, $log, $state, apiUrl) {
    'ngInject'
    this.$q = $q
    this.localStorageService = localStorageService
    this.$http = $http
    this.$log = $log
    this.$state = $state
    this.apiUrl = apiUrl
  }

  errorMess = ''

  errorMessage () {
    return this.errorMess
  }

  getLocations () {
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
      this.errorMess='Unable to search flights at this time. Please try again later.'
    })
  }

  searchFlights (origin, destination) {
    typeof(origin)
    return this.$http({
      method: 'GET',
      url: `${this.apiUrl}/flights/search`,
      params: {origin: origin, destination: destination},
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
    }).then((response) => {
      console.log(response.data)
      return response.data
    }, (response) => {
    })
  }

  // searchFlights (origin, destination, flights) {
  //   let selectFlights = []
  //   let tempFlights = []
  //   for (let i = 0; i < flights.length; i++) {
  //     // tempFlights = []
  //     this.$log.log('Current flight: ' + flights[i].origin + ' to ' + flights[i].destination)
  //     if (flights[i].origin === origin.toUpperCase()) {
  //       tempFlights = [flights[i]]
  //       if (flights[i].destination === destination.toUpperCase()) {
  //       selectFlights.push(tempFlights)
  //       } else {
  //         let origin2 = flights[i].destination
  //         for (let j = 0; j < flights.length; j++) {
  //           if ((flights[j].origin === origin2.toUpperCase()) &&
  //             (flights[j].destination === destination.toUpperCase()) &&
  //             (flights[j].offset > (flights[i].offset + flights[i].flightTime))) {
  //             tempFlights.push(flights[j])
  //             selectFlights.push(tempFlights)
  //             tempFlights = [flights[i]]
  //           }
  //         }
  //       }
  //     }
  //   }
  //   tempFlights = [] //clear out tempFlights when exiting
  //   this.$log.log('# Selected Flights: ' + selectFlights.length)
  //   return selectFlights
  // }

  bookFlight (accountId, flights) {
    let itinerary = {flights: flights}
    return this.$http({
      method: 'POST',
      url: `${this.apiUrl}/account/book`,
      params: {id: accountId},
      data: itinerary
    }).then((response) => {
      return response.data
    }, (response) => {
      this.errorMess="Unable to book flight at this time. Please try again later."
    })
  }

}
