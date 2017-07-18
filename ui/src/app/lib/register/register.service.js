export class RegisterService {
  constructor ($q, localStorageService, $http, $log, $state) {
    'ngInject'
    this.$q = $q
    this.localStorageService = localStorageService
    this.$http = $http
    this.$log = $log
    this.$state = $state
  }

  errorMess = ''

  errorMessage () {
    return this.errorMess
  }

  accountExists (username, email) {
    return this.$http({
      method: 'GET',
      url: 'http://localhost:8000/exists/flier',
      params: {username: username, email: email},
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
    }).then((response) => {
      if (response.data.username !== undefined) {
        this.localStorageService.set('flierData', response.data)
        return true
      }
      return false
    }, (response) => {
      return false
    })
  }

  newAccount (username, password, email, firstName, lastName, phone) {
    // checks if the username is one of the known usernames

    return this.$http({
      method: 'POST',
      url: 'http://localhost:8000/flier',
      data: {username: username, password: password, email: email, phone: phone, firstName: firstName, lastName: lastName}
    }).then((response) => {
      if (response.data.username !== undefined) {
        this.localStorageService.set('flierData', response.data)
        return true
      }
      return false
    }, (response) => {
      return false
    })
  }

}
