import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import MovieDetail, { POSTER_PATH } from '../MovieDetail';

// sets fetch globally for entire test suite
global.fetch = require('jest-fetch-mock');

afterEach(() => {
  cleanup();
  // need to clean up the mocks after each test
  // to prevent console.error from failing the second test
  console.error.mockClear();
});

const match = {
  params: {
    id: 'alsdnfkd',
  },
};

console.error = jest.fn();

const movie = {
  id: 'hello',
  title: 'Level Up Is Great',
  poster_path: 'noeifang',
  release_date: 'March 11, 1989',
  overview:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, non labore dolorem blanditiis soluta praesentium voluptas dolore numquam pariatur magnam at, deserunt neque sequi aperiam eius consequuntur? Aliquid, quaerat vitae.',
};
test('<MovieDetail />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movie));

  const { getByTestId } = render(<MovieDetail match={match} />);
  await waitForElement(() => getByTestId('movie-title'));
  await waitForElement(() => getByTestId('poster-path'));
  await waitForElement(() => getByTestId('release-date'));
  await waitForElement(() => getByTestId('movie-overview'));

  expect(getByTestId('movie-title').textContent).toBe(movie.title);
  expect(getByTestId('release-date').textContent).toBe(movie.release_date);
  expect(getByTestId('movie-overview').textContent).toBe(movie.overview);
  expect(getByTestId('poster-path').src).toBe(
    `${POSTER_PATH}${movie.poster_path}`,
  );
});
