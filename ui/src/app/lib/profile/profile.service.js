export class ProfileService {
  constructor ($q, localStorageService, $http, $log, $state) {
    'ngInject'
    this.$q = $q
    this.localStorageService = localStorageService
    this.$http = $http
    this.$log = $log
    this.$state = $state
  }

  // Checks if a user is currently logged in
  isLoggedOn () {
    return this.localStorageService.get('flierInfo') !== null
  }

  // Get user by email
  getFlier (username) {
    let method = 'GET'
    let apiUrl = 'http://localhost:8000/flier/' + username

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

  //  List the flights of a flier
  getFlierFlights (username) {
    let method = 'GET'
    let apiUrl = 'http://localhost:8000/flights' + username

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

  // Update / Patch a flier's account info
  updateProfile (email, firstName, lastName, phone) {
    let flierUsername = this.localStorageService.get('flierInfo').username
    let flierPass = this.localStorageService.get('flierInfo').password
    let method = 'PATCH'
    let apiUrl = 'http://localhost:8000/flier/' + flierUsername
    let params = { firstName: firstName, lastName: lastName, phone: phone }
    let requestBody = { credentials: { username: flierUsername, password: flierPass } }

    return this.$http({
      method: method,
      url: apiUrl,
      params: params,
      data: requestBody
    }).then((response) => {
    }, (response) => {
      this.$log.log('Unable to update profile of: ' + flierUsername)
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
