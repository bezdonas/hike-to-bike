import { h, Component } from 'preact';
import {
  initMap,
  mapPanTo,
  removeMarker,
  addStationToMap,
  addCurrentPosToMap,
} from '../../MapAdapter/LeafletAdapter.js';
import {
  getStationsPromise,
  parseStations,
  getClosestStations,
} from '../../StationsApi/StationsApi.js';
import './stationsMap.css';

const defaultZoom = 15;

// StationsMapProps = { currentPosition: [lat, lng], showAllStations: boolean }
export default class StationsMap extends Component {
  constructor(props) {
    super(props);
    this.mapInstance;
    this.currentPositionMarker;
    this.markers = {
      // stationId: LeafletMarker
    };
    this.allStations = [];
    this.closestStations = [];
  }

  addClosestStations() {
    this.closestStations = getClosestStations(
      this.props.currentPosition,
      this.allStations
    );

    const stationsToShow = this.props.showAllStations
      ? this.allStations
      : this.closestStations;

    stationsToShow.forEach(station => {
      this.markers[station.id] = addStationToMap(this.mapInstance, station);
    });
  }

  removeOldClosestStations() {
    const stationsToRemove = this.props.showAllStations
      ? this.allStations
      : this.closestStations;
    stationsToRemove.forEach(station => {
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
