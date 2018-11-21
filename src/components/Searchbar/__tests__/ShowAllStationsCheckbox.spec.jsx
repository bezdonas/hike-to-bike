import { h, preact } from 'preact';
import 'preact-compat';
import render from 'preact-render-to-json';
import ShowAllStationsCheckbox from '../ShowAllStationsCheckbox.jsx';

describe('ShowAllStationsCheckbox', () => {
  it('renders as expected and matches snapshot', () => {
    const props = {
      showAllStations: true,
      toggleShowAllStations: () => false,
    };
    expect(render(<ShowAllStationsCheckbox {...props} />)).toMatchSnapshot();
  });
});
