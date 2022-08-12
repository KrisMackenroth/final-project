import React from 'react';
import MacroForm from '../components/macros-chart';
import TemporaryDrawer from '../components/navbar';
export default class MacrosPage extends React.Component {

  render() {
    const drawer = <TemporaryDrawer />;

    return (

      <div>
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
              <div>
                <MacroForm />
              </div>

            </div>
          </div>

      </div>

    );
  }
}
