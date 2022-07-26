import React from 'react';
import Home from './pages/home';
import { parseRoute } from './lib';
import Auth from './pages/auth';
import AppContext from './lib/app-context';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    addEventListener('hashchange', () => { this.setState({ route: parseRoute(window.location.hash) }); });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in' || path === 'sign-up') {
      return <Auth />;
    }

  }

  render() {
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
      <React.Fragment>
        <nav className="navbar background-light-grey">
          <div className="container-fluid justify-content-center">
            <span className="navbar-brand mb-0 h1 karla-medium-italic fs-3">MyWorkout</span>
          </div>
        </nav>
        <div className='container-fluid background-dark-blue'>
      <div className='col'>
      { this.renderPage() }
    </div>
      </div>
      </React.Fragment>
      </AppContext.Provider>
    );
  }
}
