import templateUrl from './map.component.html'
import { isNullOrUndefined } from 'util';

/* @ngInject */
class MapController {
  zoom = 7
  center = [35.5175, -86.5804]
  markers = []
  paths = []

  // const colors = ['#CC0099', '#AA1100', '#2196F3', '#FF5722']

  constructor ($map, locations, mapKey, $log) {
    this.$map = $map
    this.$log = $log
    this.mapApi = 'https://maps.google.com/maps/api/js?key=' + mapKey
    this.marker_icon = 'http://icons.iconarchive.com/icons/unclebob/spanish-travel/64/plane-icon.png'
    this.route_color = '#AA1100'
    this.city1 = {}
    this.city2 = {}

    // toTitleCase()

    this.$onInit = () => {
      if(this.origin) {
        this.origin = (this.origin.charAt(0).toUpperCase()+this.origin.slice(1).toLowerCase())
        this.destination = (this.destination.charAt(0).toUpperCase()+this.destination.slice(1).toLowerCase())

        $map.getMarkerByCityName(this.origin)
       .then(orig => {
          this.addMarker(orig)
          this.city1 = orig
          
          $map.getMarkerByCityName(this.destination)
          .then(dest => {
            this.addMarker(dest)
            this.city2 = dest
           
            this.addPath(this.city1, this.city2, this.route_color)
          })  
      
        })
        
      } else {

        // add markers from an angular constant
        const { memphis, nashville, knoxville, chattanooga } = locations
        let markers = [memphis, nashville, knoxville, chattanooga]
    
        markers.forEach(marker => this.addMarker(marker))
    
        // add paths manually
        const paths = [
          [memphis, nashville, this.route_color],
          [memphis, knoxville, this.route_color],
          [memphis, chattanooga, this.route_color],
          [nashville, knoxville, this.route_color],
          [nashville, chattanooga, this.route_color],
          [knoxville, chattanooga, this.route_color]
        ]
    
        paths.forEach(args => this.addPath(...args))
        
      }
    }
  }

  addMarker ({ latitude, longitude }) {
    this.markers.push({
      position: `[${latitude}, ${longitude}]`
    })
  }

  addPath (a, b, color) {
    this.paths.push({
      path: `[[${a.latitude}, ${a.longitude}], [${b.latitude}, ${b.longitude}]]`,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 3,
      geodesic: true
    })
  }

}

export default {
  templateUrl,
  controller: MapController,
  controllerAs: '$mapCtrl',
  bindings: {
    origin: '<',
    destination: '<'
  }

}
