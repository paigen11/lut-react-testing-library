import React from 'react';
import { render, cleanup } from 'react-testing-library';
// memory router is the fake router needed for react router tests
import { MemoryRouter } from 'react-router-dom';
import Movie, { POSTER_PATH } from '../Movie';

afterEach(() => {
  cleanup();
  // need to clean up the mocks after each test
  // to prevent console.error from failing the second test
  console.error.mockClear();
});

console.error = jest.fn();

test('<Movie />', () => {
  render(<Movie />);
  expect(console.error).toHaveBeenCalled();
});

const movie = {
  id: 'hi',
  title: 'Level Up Big Day Out',
  poster_path: 'avfklerhfr.jpg',
};

test('<Movie /> with movie', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>,
  );
  expect(console.error).not.toHaveBeenCalled();
  // use data-testid to set these test ids below
  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
  expect(getByTestId('movie-img').src).toBe(
    `${POSTER_PATH}${movie.poster_path}`,
  );
});
