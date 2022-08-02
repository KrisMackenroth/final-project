import React from 'react';
// import WorkoutList from '../components/workout-list';

export default class WorkoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: true
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('react-context-jwt');
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      }
    };
    fetch('/api/workouts', req)
      .then(res => res.json())
      .then(data => {
        this.setState({ todos: data });
        this.setState({ loading: false });
      }
      );
  }

  render() {
    const listItems = this.state.todos.map(exercise =>

<div key={exercise.workoutId} className='row text-center test align-items-center'>
      <div className='col'>
        <li key={exercise.workoutId}>{exercise.name}</li>
        <p className='inter'>{exercise.muscleGroup}</p>
      </div>
      <div className='col'>
        <button id={exercise.workoutId} type="button" className="btn btn-warning btn-sm background-color-yellow">View</button>
      </div>
    </div>
    );

    let items;

    if (this.state.loading) {
      items = <div className='text-center'>Loading</div>;
    } else {
      items = listItems;
    }
    return (
      <React.Fragment>

        <div className='container-fluid background-dark-blue'>
          <div className='col'>
            <div>
              <h1 className='color-white text-center mb-5 pt-4'>Workouts</h1>
              <div className="row">
                <div className='col text-center d-flex justify-content-center mb-5'>
                  <label htmlFor="exampleFormControlInput1" className="form-label"></label>
                  <input type="search" className="form-control d-inline search" id="exampleFormControlInput1"></input>
                  <button type="button" className="btn btn-warning btn-sm background-color-yellow">Search</button>
                </div>
              </div>
              <div className='row'>
                <div className='col color-white text-center'>Name</div>
                <div className='col'></div>
              </div>
              <div className='test row'>
              </div>
              <ul>
                {items}
              </ul>
            </div>

          </div>
        </div>
      </React.Fragment>
    );
  }
}
