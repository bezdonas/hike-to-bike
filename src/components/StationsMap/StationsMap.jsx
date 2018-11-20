import { h, Component } from 'preact';
import {
  initMap,
  addMarkerToMap,
  addCurrentPosToMap,
} from '../../MapAdapter/LeafletAdapter.js';
import {
  getStationsPromise,
  parsePoints,
  getClosestPoints,
} from '../../API/StationsApi.js';
import './stationsMap.css';

const defaultZoom = 15;

// StationsMapProps = { currentPosition: [lat, lng] }
export default class StationsMap extends Component {
  componentDidMount() {
    this.markers = {};
    this.mapInstance;
    const currentPosition = this.props.currentPosition;

    this.mapInstance = initMap('stations-map', currentPosition, defaultZoom);
    addCurrentPosToMap(this.mapInstance, currentPosition);

    getStationsPromise().then(points => {
      points.forEach(point => {
        this.markers[point.id] = addMarkerToMap(
          this.mapInstance,
          point.coordinates,
          { opacity: 0.25 }
        );
      });
      getClosestPoints(currentPosition, points).forEach(pointId => {
        this.markers[pointId].setOpacity(1);
      });
    });
  }
  render() {
    return <div id="stations-map" className="stations-map" />;
  }
}
