import React from 'react';

export default class PersonalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      weight: '',
      height: '',
      birthday: ''
    };
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
        // this.setState({ loading: false });
      }
      );
  }

  render() {
    const splity = this.state.birthday.split('-');
    const parsed = parseInt(splity[0]);
    const newDate = new Date();
    const stringDate = JSON.stringify(newDate);
    const splitDate = stringDate.split('-');
    const almost = splitDate[0].replace("'", '');
    const nearly = almost.replace('"', '');
    const done = parseInt(nearly);
    const fullAge = done - parsed;
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
      </React.Fragment>
    );
  }
}
