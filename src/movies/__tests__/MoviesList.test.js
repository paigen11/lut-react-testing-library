import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import MoviesList from '../MoviesList';

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
      title: 'I am Groot',
      poster_path: 'groot.jpg',
    },
    {
      id: '4',
      title: 'Who Lives In a Pineapple Under the Sea',
      poster_path: 'spongebobsquarepants.jpg',
    },
  ],
};

const movie = movies.results[0];

test('<MoviesList />', async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));
  const { getByTestId, queryByTestId, getAllByTestId } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>,
  );

  expect(getByTestId('loading')).toBeTruthy();
  await waitForElement(() => getByTestId('movie-link'));
  await waitForElement(() => getByTestId('movie-link'));
  expect(queryByTestId('loading')).toBeFalsy();
  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
  expect(getAllByTestId('movie-link').length).toBe(movies.results.length);
});

test('<MoviesList /> API fail', async () => {
  movies.results.length = 0;
  fetch.mockResponseOnce(JSON.stringify(movies));
  const { getByTestId } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>,
  );

  expect(getByTestId('loading')).toBeTruthy();
});
