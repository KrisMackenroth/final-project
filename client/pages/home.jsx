import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

import WorkoutPage from './workout-page';


export default class Home extends React.Component {

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <React.Fragment>

      <div className='col'>
      <div>

        < WorkoutPage/>

      </div>
    </div>

      </React.Fragment>
    );
  }
}
Home.contextType = AppContext;
