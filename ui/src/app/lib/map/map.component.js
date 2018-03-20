import templateUrl from './map.component.html'
import { isNullOrUndefined } from 'util';

/* @ngInject */
class MapController {
  zoom = 7
  center = [35.5175, -86.5804]
  markers = []
  paths = []

  constructor ($map, locations, mapKey, $log) {
    this.$map = $map
    this.$log = $log
    this.mapApi = 'https://maps.google.com/maps/api/js?key=' + mapKey
    this.marker_icon = 'http://icons.iconarchive.com/icons/unclebob/spanish-travel/64/plane-icon.png'
    const path_colors = ['#AA1100', '#2196F3', '#FF5722', '#CC0099']
    this.city1 = {}
    this.city2 = {}

    this.$onInit = () => {
      if(this.flights) {

        let flights_max = this.flights.length - 1
        let i = 0

        this.setMarkersPaths(i, flights_max, path_colors);
        
      } else {

        // add markers from an angular constant
        const { memphis, nashville, knoxville, chattanooga } = locations
        let markers = [memphis, nashville, knoxville, chattanooga]
    
        markers.forEach(marker => this.addMarker(marker))
    
        // add paths manually
        const paths = [
          [memphis, nashville, path_colors[0]],
          [memphis, knoxville, path_colors[0]],
          [memphis, chattanooga, path_colors[0]],
          [nashville, knoxville, path_colors[0]],
          [nashville, chattanooga, path_colors[0]],
          [knoxville, chattanooga, path_colors[0]]
        ]
    
        paths.forEach(args => this.addPath(...args))
        
      }
    }
  }

  setMarkersPaths(i, flights_max, path_colors) {
    let flight = this.flights[i]
    
    this.$map.getMarkerByCityName(flight.origin)
      .then(orig => {
        this.addMarker(orig);
        this.city1 = orig;

        this.$map.getMarkerByCityName(flight.destination)
          .then(dest => {
            this.addMarker(dest);
            this.city2 = dest;

            this.addPath(this.city1, this.city2, path_colors[i]);
            if (i < flights_max) {
              i += 1
              this.setMarkersPaths(i, flights_max, path_colors)
            }
          });
      });
    return i;
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
    flights: '<'
  }
}
