import React from 'react';
import MacroForm from '../components/macros-chart';
import TemporaryDrawer from '../components/navbar';
export default class MacrosPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: true
    };
  }

  componentDidMount() {

  }

  render() {
    const best = <TemporaryDrawer />;

    return (
      <React.Fragment>
      <div>
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
                <MacroForm />
              </div>

            </div>
          </div>

      </div>
      </React.Fragment>
    );
  }
}
