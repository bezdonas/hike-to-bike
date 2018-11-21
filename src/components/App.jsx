import { h, Component } from 'preact';
import StationsMap from './StationsMap/StationsMap.jsx';
import Searchbar from './Searchbar/Searchbar.jsx';
import Sidebar from './Sidebar/Sidebar.jsx';
import Logo from './Logo/Logo.jsx';

const defaultPosition = [39.953, -75.171];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: defaultPosition,
    };

    this.handleChangePosition = this.handleChangePosition.bind(this);
  }
  handleChangePosition(newPosition) {
    this.setState({
      currentPosition: newPosition,
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
        </Sidebar>
        <StationsMap currentPosition={this.state.currentPosition} />
      </div>
    );
  }
}
