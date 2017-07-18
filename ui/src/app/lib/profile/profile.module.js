import { ProfileService } from './profile.service'
import { flightProfile } from './profile.component'
import { config } from './profile.config'

export default angular
  .module('flight.profile', [])
  .service('profileService', ProfileService)
  .component('flightProfile', flightProfile)
  .config(config)
  .name
