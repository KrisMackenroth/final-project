import React from 'react';
import Home from './pages/home';
import { parseRoute } from './lib';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    addEventListener('hashchange', event => { this.setState({ route: parseRoute(window.location.hash) }); });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }

  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar background-light-grey">
          <div className="container-fluid justify-content-center">
            <span className="navbar-brand mb-0 h1 karla-medium-italic">MyWorkout</span>
          </div>
        </nav>
        <div className='container-fluid background-dark-blue'>
      <div className='col'>
      { this.renderPage() }
    </div>
      </div>
      </React.Fragment>
    );
  }
}
