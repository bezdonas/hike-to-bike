import { h, Component } from 'preact';
import StationsMap from './StationsMap/StationsMap.jsx';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <StationsMap />
      </div>
    );
  }
}
