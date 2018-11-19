import { h, Component } from 'preact';
import { initMap } from './MapHelpers.js';
import './stationsMap.css';

export default class StationsMap extends Component {
  componentDidMount() {
    initMap('stations-map', [51.505, -0.09], 13);
  }
  render() {
    return <div id="stations-map" className="stations-map" />;
  }
}
