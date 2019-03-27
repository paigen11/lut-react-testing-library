import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import MovieForm from '../MovieForm';

afterEach(cleanup);

// eslint-disable-next-line no-undef
const onSubmit = jest.fn();

test('<MovieForm />', () => {
  const { queryByTestId, getByText, getByLabelText } = render(
    <MovieForm submitForm={onSubmit} />,
  );
  expect(queryByTestId('movie-form')).toBeTruthy();

  // getByLabelText('Text').value = 'hello';
  // fireEvent.change(getByLabelText('Text'));
  // this does the same as the two lines above in one fell swoop
  fireEvent.change(getByLabelText('Text'), {
    target: { value: 'hello' },
  });

  fireEvent.click(getByText('Submit'));
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    text: 'hello',
  });
});
