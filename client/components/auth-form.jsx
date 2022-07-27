import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const alternatHeaderText = action === 'sign-up'
      ? 'Register'
      : 'Sign In';
    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const alternatActionText = action === 'sign-up'
      ? 'Already have an account? '
      : "Don't have an account? ";
    const submitButtonText = action === 'sign-up'
      ? 'Register'
      : 'Sign In';
    const alternatA = action === 'sign-up'
      ? 'Sign In'
      : 'Register';
    return (
      <form className="w-100" onSubmit={handleSubmit}>
        <h1 className='color-white text-center'>{alternatHeaderText}</h1>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
          </label>
          <input
            required
            autoFocus
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Username"
            className="form-control bg-light" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
          </label>
          <input
            required
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="form-control bg-light" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
          </label>
          <input
            required
            autoFocus
            id="email"
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="form-control bg-light" />
        </div>
        <div className="d-flex flex-column-reverse justify-content-between align-items-center">
          <small>
            <p className='color-white'>{alternatActionText}<a className="text-primary" href={alternateActionHref}>
              {alternatA}
            </a></p>
          </small>
          <button type="submit" className="btn btn-warning btn-sm background-color-yellow">
            {submitButtonText}
          </button>
        </div>
      </form>
    );
  }
}
