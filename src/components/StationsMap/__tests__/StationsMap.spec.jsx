import { h, preact } from 'preact';
import 'preact-compat';
import render from 'preact-render-to-json';
import StationsMap from '../StationsMap.jsx';

describe('StationsMap', () => {
  it('renders as expected and matches snapshot with showAllStations', () => {
    const props = {
      showAllStations: true,
      currentPosition: [55, 31],
    };
    expect(render(<StationsMap {...props} />)).toMatchSnapshot();
  });
  it('renders as expected and matches snapshot without showAllStations', () => {
    const props = {
      showAllStations: false,
      currentPosition: [55, 31],
    };
    expect(render(<StationsMap {...props} />)).toMatchSnapshot();
  });
});
