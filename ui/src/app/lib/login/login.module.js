import { LoginService } from './login.service'
import { flightLogin } from './login.component'
import { config } from './login.config'
// import { run } from 'login/loginhook.run'

export default angular
  .module('flight.login', [])
  .service('loginService', LoginService)
  .component('flightLogin', flightLogin)
  .config(config)
  // .run(run)
  .name
