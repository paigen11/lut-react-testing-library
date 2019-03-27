import React from 'react';
import { render, cleanup } from 'react-testing-library';
import NewMovie from '../NewMovie';

afterEach(cleanup);

test('<NewMovie />', () => {
  const { getByTestId, queryByTestId, container } = render(<NewMovie />);
  expect(getByTestId('page-title').textContent).toBe('New Movie');
  expect(queryByTestId('movie-form')).toBeTruthy();

  // to update snapshots after changes made to component, type u in cmd line after tests run
  expect(container.firstChild).toMatchSnapshot();
});
