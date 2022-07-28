import React from 'react';
// import ExercisesPage from '../pages/exercises-page';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import TemporaryDrawer from '../components/navbar';
// import PersonalInfo from './personal-info';
import MacrosPage from './macros';

export default class Home extends React.Component {

  render() {
    const best = <TemporaryDrawer />;
    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <React.Fragment>
      <nav className="navbar background-light-grey">
          <div className="container-fluid justify-content-center">
              <div className='col'>{best}</div>
              <div className='col text-center margin-0'>
              <span className="mb-0 h1 karla-medium-italic fs-3">MyWorkout</span>
              </div>
              <div className='col'></div>
          </div>

        </nav>

        <div className='container-fluid background-dark-blue'>
      <div className='col'>
      <div>
        <MacrosPage/>
      </div>

    </div>
      </div>
      </React.Fragment>
    );
  }
}
Home.contextType = AppContext;
