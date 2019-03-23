import React from 'react';
import { render, cleanup } from 'react-testing-library';
// memory router is the fake router needed for react router tests
import { MemoryRouter } from 'react-router-dom';
import Movie from './Movie';

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
  render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>,
  );
  expect(console.error).not.toHaveBeenCalled();
});
