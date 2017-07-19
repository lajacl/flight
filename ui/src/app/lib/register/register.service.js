export class RegisterService {
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

  // checks if the email is already used for an account
  accountExists (email) {
    return this.$http({
      method: 'GET',
      url: 'http://localhost:8000/flight/account/exists/' + email,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
    }).then((response) => {
      this.$log.log('Response Data: ' + response.data)
      return response.data
    }, (response) => {
      this.$log.log('Exists error: true')
    })
  }

  newAccount (account) {
    return this.$http({
      method: 'POST',
      url: 'http://localhost:8000/flight/account',
      data: account
    }).then((response) => {
      if (response.data.email !== undefined) {
        this.localStorageService.set('accountData', response.data)
      }
    }, (response) => {
      this.$log.log('Exists error: creating new account')
    })
  }

}
