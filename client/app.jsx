import React from 'react';
import Home from './pages/home';
import { parseRoute } from './lib';
import Auth from './pages/auth';
import AppContext from './lib/app-context';
import jwtDecode from 'jwt-decode';
import ExercisesPage from './pages/exercises-page';
import PersonalInfo from './pages/personal-info';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash),
      isClicked: false,
      token: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleClick(event) {
    if (event.target.classList.contains('Sign-Out')) {
      this.handleSignOut();
    }

  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
    this.setState({ token });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in' || path === 'sign-up') {
      return <Auth />;
    }
    if (path === 'exercises-page') {
      return <ExercisesPage />;
    }
    if (path === 'personal-info') {
      return <PersonalInfo />;
    }

  }

  render() {

    const { user, route, token } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut, token };

    return (
      <AppContext.Provider value={contextValue}>
<div onClick={this.handleClick}>
      { this.renderPage() }
        </div>
      </AppContext.Provider>
    );
  }
}
