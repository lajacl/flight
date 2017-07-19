export class LoginService {
  constructor (localStorageService, $http, $log, $q) {
    'ngInject'
    this.localStorageService = localStorageService
    this.$http = $http
    this.$log = $log
    this.$q = $q
  }

  /**
   * Returns true if the user is currently authenticated, else false
   */
  isLoggedOn () {
    return this.localStorageService.get('accountData') !== null
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

  /**
   * Authentication function that returns a promise that is either resolved or rejected.
   */
  logon (email, password) {
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/flight/account/login',
      params: {email: email, password: password}
    }).then((response) => {
      if (response.data.email !== undefined) {
        this.localStorageService.set('accountData', response.data)
      }
      return false
    }, (response) => {
      return false
    })
  }

  /** Logs the current user out */
  logout () {
    this.localStorageService.clearAll()
  }

}
