import React from 'react';
import CalculateAge from './age';

export default class PersonalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      weight: '',
      height: '',
      birthday: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('react-context-jwt');
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      }
    };
    fetch('/api/info', req)
      .then(res => res.json())
      .then(data => {
        this.setState({ gender: data[0].sex });
        this.setState({ weight: data[0].weight });
        this.setState({ height: data[0].height });
        this.setState({ birthday: data[0].birthday });
      }
      );
  }

  handleClick(event) {
    if (event.target.classList.contains('confirm')) {
      const token = window.localStorage.getItem('react-context-jwt');
      const req = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': token
        }
      };
      fetch('/api/info', req);
      window.location.hash = '#sign-in';
    }
    if (event.target.classList.contains('edit')) {
      window.location.hash = '#info-edit';
    }
  }

  render() {
    const fullAge = CalculateAge(this.state.birthday);
    return (
      <React.Fragment>
        <h1 className='text-center color-white mb-5'>My Profile</h1>
        <div className='col color-black background-light-grey rounded'>
          <div className='row mt-3 p-3 rounded'>
            <div className='col inter-heavy'>Sex</div>
            <div className='col inter-heavy text-center rounded-pill'>{this.state.gender}</div>
          </div>
        </div>
        <div className='col color-black background-light-grey rounded'>
          <div className='row mt-3 p-3 rounded'>
            <div className='col inter-heavy'>Weight</div>
            <div className='col inter-heavy text-center'>{this.state.weight} LB</div>
          </div>
        </div>
        <div className='col color-black background-light-grey rounded'>
          <div className='row mt-3 p-3'>
            <div className='col inter-heavy'>Height</div>
            <div className='col inter-heavy text-center'>{this.state.height} in</div>
          </div>
        </div>
        <div className='col color-black background-light-grey rounded'>
          <div className='row mt-3 p-3'>
            <div className='col inter-heavy'>Age</div>
            <div className='col inter-heavy text-center'>{fullAge}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col mt-3'>
            <button type="button" className="btn background-color-yellow" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Delete Account
        </button>
          </div>
          <div className='col text-end mt-3'>
            <button onClick={this.handleClick} type="button" className="btn edit background-color-yellow">
              Edit Account
            </button>
          </div>
        </div>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Are you sure?</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                All of your account info will be deleted.
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button onClick={this.handleClick} type="button" className="btn background-color-yellow confirm Sign-Out" data-bs-dismiss="modal">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
