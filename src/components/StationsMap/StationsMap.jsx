import { h, Component } from 'preact';
import {
  initMap,
  mapPanTo,
  removeMarker,
  addMarkerToMap,
  addCurrentPosToMap,
} from '../../MapAdapter/LeafletAdapter.js';
import {
  getStationsPromise,
  parseStations,
  getClosestStations,
} from '../../API/StationsApi.js';
import './stationsMap.css';

const defaultZoom = 15;

// StationsMapProps = { currentPosition: [lat, lng] }
export default class StationsMap extends Component {
  constructor(props) {
    super(props);
    this.mapInstance;
    this.currentPositionMarker;
    this.markers = {};
    this.allStations = []; // revert to array
    this.closestStations = [];
  }

  addClosestStations() {
    this.closestStations = getClosestStations(
      this.props.currentPosition,
      this.allStations
    );
    this.closestStations.forEach(station => {
      this.markers[station.id] = addMarkerToMap(
        this.mapInstance,
        station.coordinates
      );
    });
  }

  removeOldClosestStations() {
    this.closestStations.forEach(station => {
      removeMarker(this.markers[station.id]);
    });
  }

  showCurrentPosition() {
    this.currentPositionMarker = addCurrentPosToMap(
      this.mapInstance,
      this.props.currentPosition
    );
  }

  removeOldCurrentPosition() {
    removeMarker(this.currentPositionMarker);
  }

  componentDidMount() {
    this.mapInstance = initMap(
      'stations-map',
      this.props.currentPosition,
      defaultZoom
    );
    this.showCurrentPosition();

    getStationsPromise().then(stations => {
      this.allStations = stations;
      this.addClosestStations();
    });
  }

  componentWillUpdate() {
    this.removeOldClosestStations();
    this.removeOldCurrentPosition();
  }

  componentDidUpdate() {
    mapPanTo(this.mapInstance, this.props.currentPosition);
    this.showCurrentPosition();
    this.addClosestStations();
  }

  render() {
    return <div id="stations-map" className="stations-map" />;
  }
}
