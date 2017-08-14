export class ProfileService {
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

  //  List the flights of a flier
  getFlights (id) {
    return this.$http({
      method: 'GET',
      url: `${this.apiUrl}/account/flights`,
      params: {id: id},
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
    }).then((response) => {
      console.log(response.data)
      return response.data
    }, (response) => {
      this.errorMess='Unable to display flights at this time. Please try again later.'
    })
  }

  // Update account info
  updateAcount (email, firstName, lastName, phone) {
    let flierUsername = this.localStorageService.get('accountData').email
    let flierPass = this.localStorageService.get('accountData').password
    let method = 'PATCH'
    let apiUrl = `${this.apiUrl}/account/` + email
    let params = { email: email, firstName: firstName, lastName: lastName, phone: phone }

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
    let accountEmail = this.localStorageService.get('accountData').email
    let accountPass = this.localStorageService.get('accountData').password

    this.$http({
      method: 'POST',
      url: `${this.apiUrl}/account/delete/` + accountEmail,
      data: { credentials: { email: accountEmail, password: accountPass } }
    }).then((response) => {
      this.localStorageService.clearAll()
    }, (response) => {
      this.$log.log('Unable to delete account of: ' + flierUsername)
    })
  }

}
