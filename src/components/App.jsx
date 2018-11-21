import { h, Component } from 'preact';
import ShowAllStationsCheckbox from './Searchbar/ShowAllStationsCheckbox.jsx';
import StationsMap from './StationsMap/StationsMap.jsx';
import Searchbar from './Searchbar/Searchbar.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import Legend from './Legend/Legend.jsx';
import Logo from './Logo/Logo.jsx';

const defaultPosition = [39.953, -75.171];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: defaultPosition,
      showAllStations: false,
    };

    this.handleChangePosition = this.handleChangePosition.bind(this);
    this.toggleShowAllStations = this.toggleShowAllStations.bind(this);
  }
  handleChangePosition(newPosition) {
    this.setState({
      currentPosition: newPosition,
    });
  }
  toggleShowAllStations() {
    this.setState({
      showAllStations: !this.state.showAllStations,
    });
  }
  render(props, state) {
    return (
      <div id="app">
        <Sidebar>
          <Logo />
          <Searchbar
            position={this.state.currentPosition}
            changePosition={this.handleChangePosition}
          />
          <ShowAllStationsCheckbox
            showAllStations={this.state.showAllStations}
            toggleShowAllStations={this.toggleShowAllStations}
          />
          <Legend />
        </Sidebar>
        <StationsMap
          currentPosition={this.state.currentPosition}
          showAllStations={this.state.showAllStations}
        />
      </div>
    );
  }
}
