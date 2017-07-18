import mapLocations from './map.locations'
import mapComponent from './map.component.js'
import mapService from './map.service'
import { config } from './map.config'

export default
  angular
    .module('flight.map', ['ngMap'])
    .constant('locations', mapLocations)
    .component('flightMap', mapComponent)
    .service('$map', mapService)
    .config(config)
    .name
