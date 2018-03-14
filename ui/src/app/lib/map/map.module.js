import mapLocations from './map.locations'
import mapKey from './map.key'
import mapComponent from './map.component.js'
import mapService from './map.service'
import { config } from './map.config'

export default
  angular
    .module('flight.map', ['ngMap'])
    .constant('locations', mapLocations)
    .constant('mapKey', mapKey)
    .component('flightMap', mapComponent)
    .service('$map', mapService)
    .config(config)
    .name
