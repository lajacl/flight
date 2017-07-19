import templateUrl from './app.component.html'

/* @ngInject */
class AppController {
  constructor ($log, localStorageService) {
    $log.debug('AppController is a go.')
    this.localStorageService = localStorageService
    this.$log = $log

    this.$log.log('A user is logged on: ' + this.isLoggedOn())
  }

  // checks if a flier is currently logged in
  isLoggedOn () {
    return this.localStorageService.get('accountData') !== null
  }

  logOut () {
    this.localStorageService.clearAll()
  }

}

export default {
  templateUrl,
  controller: AppController,
  controllerAs: '$appCtrl'
}
