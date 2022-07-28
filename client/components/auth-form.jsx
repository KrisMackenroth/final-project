import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      userId: 0,
      weight: 0,
      height: 0,
      birthday: '',
      sex: ''
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
        const stats = {
          userId: result.userId,
          weight: JSON.parse(this.state.weight),
          height: JSON.parse(this.state.height),
          birthday: this.state.birthday,
          sex: this.state.sex
        };
        const reg = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(stats)
        };
        fetch('/api/info', reg);
        if (action === 'sign-up') {
          window.location.hash = '';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });

  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const check = action === 'sign-up'
      ? ''
      : 'hidden';
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
      <React.Fragment>
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
        <div className={check}>
            <h1 className='color-white text-center mb-5 pt-4'>Personal Info</h1>
            <div className='row flex-column align-center'>
              <div className='col temp'>
                <div className="input-group mb-4">
                  <label className="input-group-text" htmlFor="inputGroupSelect01">Gender</label>
                  <select name='sex' onChange={handleChange} className="form-select" id="inputGroupSelect01">
                    <option defaultChecked>Choose...</option>
                    <option value="male">Male</option>
                    <option value="male">Female</option>
                  </select>
                </div>
              </div>
              <div className='col temp'>
                <div className="input-group mb-4">
                  <span className="input-group-text" id="basic-addon1">Height</span>
                  <input onChange={handleChange} name='height' type="number" className="form-control" placeholder="Inches" aria-label="Height" aria-describedby="basic-addon1"></input>
                </div>
              </div>
              <div className='col temp'>
                <div className="input-group mb-4">
                  <span className="input-group-text" id="basic-addon1">Weight</span>
                  <input onChange={handleChange} name='weight' type="number" className="form-control" placeholder="Pounds" aria-label="Weight" aria-describedby="basic-addon1"></input>
                </div>
              </div>
              <div className='col temp'>
                <div className="input-group mb-4">
                  <span className="input-group-text" id="basic-addon1">DoB</span>
                  <input onChange={handleChange} name='birthday' type="text" className="form-control" placeholder="DD/MMM/YYYY" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
              </div>
            </div>
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
      </React.Fragment>
    );
  }
}
