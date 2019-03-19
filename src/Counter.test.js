import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Counter from './Counter';

test('<Counter />', () => {
  const wrapper = render(<Counter />);

  // the easiest way to see exactly what your test is looking at
  wrapper.debug();
  expect(wrapper.getByText('0').tagName).toBe('BUTTON');
});
