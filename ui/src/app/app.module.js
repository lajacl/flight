import flightBooking from './lib/booking/booking.module'
import flightFlights from './lib/flights/flights.module'
import flightLogin from './lib/login/login.module'
import flightRegister from './lib/register/register.module'
import flightProfile from './lib/profile/profile.module'
import flightMap from './lib/map/map.module'
import apiUrl from './api.url'
import appComponent from './app.component.js'

import ngLocalStorage from 'angular-local-storage'
import ngUiRouter from 'angular-ui-router'

import { config } from './app.config'
import { run } from './app.run'

export default
  angular
    .module('flight', [
      'ngAria',
      'ngAnimate',
      'ngMaterial',
      'ngMessages',
      'ui.router',

      ngLocalStorage,
      ngUiRouter,
      flightLogin,
      flightRegister,
      flightBooking,
      flightProfile,
      flightFlights,
      flightMap
    ])
    .constant('apiUrl', apiUrl)
    .component('flightApp', appComponent)
    .config(config)
    .run(run)
    .name
