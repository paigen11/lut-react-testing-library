import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Counter from './Counter';

test('<Counter />', () => {
  // renders component (with destructuring to remove wrapper)
  const { debug, getByTestId, getByText } = render(<Counter />);

  // the easiest way to see exactly what your test is looking at, outputs dom as string
  debug();

  // asserts text value 0 is found within a button
  expect(getByText('0').tagName).toBe('BUTTON');
  // asserts counter button is a button
  expect(getByTestId('counter-button').tagName).toBe('BUTTON');
  // asserts counter buttons starts at 0
  expect(getByTestId('counter-button').textContent).toBe('0');
});
