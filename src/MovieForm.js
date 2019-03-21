import React, { Component } from 'react';

export default class MovieForm extends Component {
  state = {
    text: '',
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { submitForm } = this.props;
    const { text } = this.state;

    return (
      <div>
        <form data-testid="movie-form" onSubmit={() => submitForm({ text })}>
          <label htmlFor="text">
            Text
            <input
              type="text"
              id="text"
              onChange={e => this.setState({ text: e.target.value })}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
