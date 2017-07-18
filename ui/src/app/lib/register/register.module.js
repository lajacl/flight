import { RegisterService } from './register.service'
import { flightRegister } from './register.component'
import { config } from './register.config'

export default angular
  .module('flight.register', [])
  .service('registerService', RegisterService)
  .component('flightRegister', flightRegister)
  .config(config)
  .name
