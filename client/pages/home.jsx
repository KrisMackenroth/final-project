import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import PersonalInfo from './personal-info';

export default class Home extends React.Component {

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <React.Fragment>

      <div className='col'>
      <div>
        < PersonalInfo/>
      </div>
    </div>

      </React.Fragment>
    );
  }
}
Home.contextType = AppContext;
