import { h, preact } from 'preact';
import render from 'preact-render-to-json';
import Legend from '../Legend.jsx';

describe('Legend', () => {
  it('renders as expected and matches snapshot', () => {
    expect(render(<Legend />)).toMatchSnapshot();
  });
});
