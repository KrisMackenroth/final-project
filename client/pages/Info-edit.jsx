import React from 'react';
import AppContext from '../lib/app-context';
import TemporaryDrawer from '../components/navbar';
import EditForm from '../components/Edit-form';

export default class InfoEdit extends React.Component {

  render() {

    const best = <TemporaryDrawer />;
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
            <div className="row pt-5 align-items-center">
              <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
                <EditForm/>
              </div>
            </div>

          </div>
        </div>
      </React.Fragment>
    );
  }
}
InfoEdit.contextType = AppContext;
