import { ProfileService } from './profile.service'
import { flightProfile } from './profile.component'
import { config } from './profile.config'
import flightMap from '../map/map.module'

export default angular
  .module('flight.profile', [
    flightMap
  ])
  .service('profileService', ProfileService)
  .component('flightProfile', flightProfile)
  .config(config)
  .name
