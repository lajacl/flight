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

  serchFlights () {

  }

  bookFlight (flightId) {
    let requestData = { credentials: { username: username, password: password }
  }

    return this.$http({
      method: 'POST',
      url: 'http://localhost:8000/flier/book',
      params: optionalInfo,
      data: requestDate
    }).then((response) => {
      if (response.data.username !== undefined) {
        this.localStorageService.set('currentUser', response.data)
        this.localStorageService.set('password', password)
        return true
      }
      return false
    }, (response) => {
      return false
    })
  }

  errorMessage () {
    return this.errorMess
  }

}
