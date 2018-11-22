import { h, preact } from 'preact';
import render from 'preact-render-to-json';
import Sidebar from '../Sidebar.jsx';

describe('Sidebar', () => {
  it('renders children and matches snapshot', () => {
    expect(render(<Sidebar>I am inside sidebar!</Sidebar>)).toMatchSnapshot();
  });
});
