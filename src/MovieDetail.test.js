import React from 'react';
import { render, cleanup } from 'react-testing-library';
import MovieDetail from './MovieDetail';

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

test('<MovieDetail />', () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      movie: {
        id: 'hello',
        title: 'Level Up Is Great',
      },
    }),
  );

  const { debug } = render(<MovieDetail match={match} />);
  debug();
});
