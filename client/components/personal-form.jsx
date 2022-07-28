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

    return (
      <div className='row'>
        <div className='col color-black background-light-grey'>
          <div className='row'>
            <div className='col'>test</div>
            <div className='col'>{this.state.sex}LB</div>
          </div>
        </div>
        <div className='col color-black background-light-grey'>
          <div className='row'>
          <div className='col'>test</div>
          <div className='col'>{this.state.weight}LB</div>
          </div>
        </div>
        <div className='col color-black background-light-grey'>
          <div className='row'>
            <div className='col'>test</div>
            <div className='col'>{this.state.height}LB</div>
          </div>
        </div>
      </div>
    );
  }
}
