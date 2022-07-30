import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <Box
      className='background-dark-blue height'
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <nav className="navbar background-light-grey">
        <div className="container-fluid justify-content-center">
          <span className="navbar-brand mb-0 h1 karla-medium-italic fs-3">Menu</span>
        </div>
      </nav>
      <List>
        <div className='row'>
          <div className='col'>
        <button className='nav-buttons'>
              <a href='#personal-info' className='personal-info nav-buttons'>My Profile</a>
        </button>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
        <button className='nav-buttons'>
              <a href='#exercises-page' className='exercises nav-buttons'>Exercises</a>
        </button>
        </div>
      </div>
        <div className='row'>
          <div className='col'>
            <button className='nav-buttons'>
              <a href='#macros' className='exercises nav-buttons'>Macros</a>
            </button>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
        <button className='nav-buttons'>
          <a href='#' className='Sign-Out nav-buttons'>Sign Out</a>
        </button>
          </div>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map(anchor => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><i className="fa-solid fa-bars big"></i></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
