import React from 'react';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const token = window.localStorage.getItem('react-context-jwt');
    const req = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/info', req);
    window.location.hash = '#personal-info';
  }

  render() {
    const { handleChange, handleSubmit } = this;

    return (
      <React.Fragment>
        <form className="w-100" onSubmit={handleSubmit}>
            <h1 className='color-white text-center mb-5 pt-4'>Edit Personal Info</h1>
            <div className='row flex-column align-center'>
              <div className='col temp'>
                <div className="input-group mb-4">
                  <label className="input-group-text" htmlFor="inputGroupSelect01">Gender</label>
                  <select name='sex' onChange={handleChange} className="form-select" id="inputGroupSelect01">
                    <option defaultChecked>Choose...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
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
                  <input onChange={handleChange} name='birthday' type="text" className="form-control" placeholder="MM/DD/YYYY" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-warning btn-sm background-color-yellow">
              Submit
            </button>
        </form>
      </React.Fragment>
    );
  }
}
