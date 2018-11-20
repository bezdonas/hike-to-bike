import { h, Component } from 'preact';
import StationsMap from './StationsMap/StationsMap.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: [39.953, -75.171],
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        currentPosition: [
          this.state.currentPosition[0] - 0.001,
          this.state.currentPosition[1] + 0.001,
        ],
      });
    }, 1000);
  }
  render(props, state) {
    return (
      <div id="app">
        <StationsMap currentPosition={this.state.currentPosition} />
      </div>
    );
  }
}
