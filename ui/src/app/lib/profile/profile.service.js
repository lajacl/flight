export class ProfileService {
  constructor ($q, localStorageService, $http, $log, $state) {
    'ngInject'
    this.$q = $q
    this.localStorageService = localStorageService
    this.$http = $http
    this.$log = $log
    this.$state = $state
  }

  //  List the flights of a flier
  getFlights (email) {
    let method = 'GET'
    let apiUrl = 'http://localhost:8000/flight/account/flights'

    return this.$http({
      method: method,
      url: apiUrl,
      params: {email: email},
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
    }).then((response) => {
      return response.data
    }, (response) => {
    })
  }

  // Update account info
  updateAcount (email, firstName, lastName, phone) {
    let flierUsername = this.localStorageService.get('accountData').email
    let flierPass = this.localStorageService.get('accountData').password
    let method = 'PATCH'
    let apiUrl = 'http://localhost:8000/account/' + email
    let params = {email: email, firstName: firstName, lastName: lastName, phone: phone }

    return this.$http({
      method: method,
      url: apiUrl,
      params: params
    }).then((response) => {
    }, (response) => {
      this.$log.log('Unable to update profile of: ' + email)
    })
  }

  // Delete a flier's account
  deleteAccount () {
    let flierUsername = this.localStorageService.get('flierInfo').username
    let flierPass = this.localStorageService.get('flierInfo').password
    let method = 'POST'
    let apiUrl = 'http://localhost:8000/flier/delete/' + flierUsername
    let requestBody = { credentials: { username: flierUsername, password: flierPass } }

    this.$http({
      method: method,
      url: apiUrl,
      data: requestBody
    }).then((response) => {
      this.localStorageService.clearAll()
    }, (response) => {
      this.$log.log('Unable to delete account of: ' + flierUsername)
    })
  }

}
