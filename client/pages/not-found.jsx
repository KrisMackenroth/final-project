import React from 'react';
import TemporaryDrawer from '../components/navbar';

export default function NotFound(props) {
  const drawer = <TemporaryDrawer />;
  return (
    <React.Fragment>
      <nav className="navbar background-light-grey sticky-top">
        <div className="container-fluid justify-content-center">
          <div className='col'>{drawer}</div>
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

              <h3 className='color-white inter text-center'>
                Uh oh, we could not find the page you were looking for!
              </h3>
              <p className='text-center mt-4'>
                <a className="btn btn-warning btn-sm background-color-yellow" href="#">Return Home</a>

              </p>

            </div>
          </div>

        </div>
      </div>

    </React.Fragment>
  );
}
