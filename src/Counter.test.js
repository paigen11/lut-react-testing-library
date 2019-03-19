import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import Counter from './Counter';

afterEach(cleanup);

test('<Counter />', () => {
  // renders component (with destructuring to remove wrapper)
  const { debug, getByTestId, getByText } = render(<Counter />);

  // the easiest way to see exactly what your test is looking at, outputs dom as string
  // debug();
  const counterButton = getByTestId('counter-button');

  // asserts text value 0 is found within a button
  expect(getByText('0').tagName).toBe('BUTTON');
  // asserts counter button is a button
  expect(counterButton.tagName).toBe('BUTTON');
  // asserts counter buttons starts at 0
  expect(counterButton.textContent).toBe('0');

  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe('1');

  fireEvent.click(counterButton);
  expect(counterButton.textContent).toBe('2');
  // debug(); // super cool, because it shows the dom state after the two clicks
});
