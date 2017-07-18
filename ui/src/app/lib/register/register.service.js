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

  register (username, password, email, firstName, lastName, phoneNumber) {
    // checks if the username is one of the known usernames, and the password is 'password'

    let userObject = { credentials: { username: username, password: password }, profile: { email: email } }
    let optionalInfo = { firstName: firstName, lastName: lastName, phone: phoneNumber }

    return this.$http({
      method: 'POST',
      url: 'http://localhost:8888/user/users',
      params: optionalInfo,
      data: userObject
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
