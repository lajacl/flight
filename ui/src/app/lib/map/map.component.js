import templateUrl from './map.component.html'

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

    // add markers from an angular constant
    const { memphis, nashville, knoxville } = locations
    const markers = [memphis, nashville, knoxville]

    markers.forEach(marker => this.addMarker(marker))

    // add paths manually
    const paths = [
      [memphis, nashville, this.route_color],
      [memphis, knoxville, this.route_color],
      [nashville, knoxville, this.route_color]
    ]

    paths.forEach(args => this.addPath(...args))

    // add path from webservice
    $map.getMarkerByCityName('Chattanooga')
      .then(chattanooga => {
        this.addMarker(chattanooga)
        
        this.addPath(knoxville, chattanooga, this.route_color)
        this.addPath(nashville, chattanooga, this.route_color)
        this.addPath(memphis, chattanooga, this.route_color)
      })
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
    locations: '=',
    origin: '=',
    destination: '=',
    flightTime: '='
  }

}
