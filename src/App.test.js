import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from 'react-testing-library';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { POSTER_PATH } from './movies/Movie';

import App from './App';

global.fetch = require('jest-fetch-mock');

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const movies = {
  results: [
    {
      id: '1',
      title: 'Hello',
      poster_path: 'nnavrngr.jpg',
    },
    {
      id: '2',
      title: 'World',
      poster_path: 'vnkafhriva.jpg',
    },
    {
      id: '3',
      title: 'Single Movie Test',
      poster_path: 'avfklerhfr.jpg',
    },
  ],
};

// this is a handy function that I would utilize for any component
// that relies on the router being in context
function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

test('<App /> home link', async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));
  const { getByTestId, queryByTestId, getAllByTestId } = renderWithRouter(
    <App />,
  );
  expect(getByTestId('loading')).toBeTruthy();

  const leftClick = { button: 0 };
  fireEvent.click(getByTestId('app-logo'), leftClick);
  await waitForElement(() => getByTestId('movie-link'));
  expect(queryByTestId('loading')).toBeFalsy();
  expect(getByTestId('movie-img').src).toBe(
    `${POSTER_PATH}${movies.results[0].poster_path}`,
  );
  expect(getByTestId('movie-link').getAttribute('href')).toBe(
    `/${movies.results[0].id}`,
  );
  expect(getAllByTestId('movie-link').length).toBe(movies.results.length);
});
