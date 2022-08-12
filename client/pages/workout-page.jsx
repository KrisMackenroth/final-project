import React from 'react';
import TemporaryDrawer from '../components/navbar';
// import WorkoutList from '../components/workout-list';

export default class WorkoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: true,
      exercises: [],
      muscleGroup: '',
      workoutName: '',
      view: 'hidden',
      allExercises: [],
      chosenExercise: '',
      chosenWorkout: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
    this.getExercises = this.getExercises.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick(event) {

    for (let x = 0; x < this.state.todos.length; x++) {
      if (parseInt(event.target.id) === this.state.todos[x].workoutId) {
        this.setState({ chosenWorkout: parseInt(event.target.id) });
      }
    }

    if (event.target.classList.contains('exercise-submit')) {

      for (let x = 0; x < this.state.allExercises.length; x++) {
        if (this.state.chosenExercise === this.state.allExercises[x].name) {
          const token = window.localStorage.getItem('react-context-jwt');
          const info = {
            workoutId: this.state.chosenWorkout,
            exerciseId: this.state.allExercises[x].exerciseId
          };
          const req = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Access-Token': token
            },
            body: JSON.stringify(info)
          };
          fetch('/api/combined', req);

        }
      }
    }
    if (event.target.classList.contains('add-exercise')) {
      this.setState({ view: 'visible' });
    } else {
      const token = window.localStorage.getItem('react-context-jwt');
      const req = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': token
        }
      };
      fetch(`/api/combined/${parseInt(event.target.id)
}`, req)
        .then(res => res.json())
        .then(data => {
          this.setState({ exercises: data });
        }
        );
      this.setState({ view: 'hidden' });
    }
  }

  handleSubmit(event) {
    this.setState({ loading: true });
    event.preventDefault();
    const token = window.localStorage.getItem('react-context-jwt');
    const info = {
      name: this.state.workoutName,
      muscleGroup: this.state.muscleGroup
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      body: JSON.stringify(info)
    };
    fetch('/api/workouts', req)
      .then(res => res.json())
      .then(result => {
        this.getData();
      });

  }

  getExercises() {
    fetch('/api/exercises')
      .then(response => response.json())
      .then(data => {
        this.setState({ allExercises: data });
      }
      );
  }

  getData() {
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

  componentDidMount() {
    this.getData();
    this.getExercises();
  }

  render() {

    const all = this.state.allExercises.map(exercise =>
      <option key={exercise.exerciseId} id={exercise.exerciseId} value={exercise.name}>{exercise.name}</option>

    );

    const listItems = this.state.todos.map(exercise =>
<div key={exercise.workoutId} className='row text-center test align-items-center'>
        <div className='col'>
        <li key={exercise.workoutId}>{exercise.name}</li>
        <p className='inter'>{exercise.muscleGroup}</p>
      </div>
      <div className='col'>
          <button onClick={this.handleClick} id={exercise.workoutId} type="button" className="btn btn-warning btn-sm background-color-yellow" data-bs-toggle="modal" data-bs-target="#exampleModal">
            View
          </button>
      </div>
    </div>
    );

    const listExercises = this.state.exercises.map(exercise =>

      <div key={exercise.id} className='row text-center test align-items-center'>
        <div className='col'>
          <li key={exercise.id}>{exercise.exercise}</li>
        </div>
      </div>
    );

    let items;
    const drawer = <TemporaryDrawer />;
    if (this.state.loading) {
      items = <div className='text-center'>Loading</div>;
    } else {
      items = listItems;
    }
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
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Exercises</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body list-unstyled">
                {listExercises}
              </div>
              <div className='row m-auto'>
        <div className={this.state.view}>
          <div className='col'>
                    <div>
                  <label htmlFor="Exercises">Choose an Exercise</label>
                      <select name="chosenExercise" id="exercises"
                        onChange={this.handleChange}>
                    {all}
                  </select>
                      <button onClick={this.handleClick} type="button" className="btn btn-warning color-white add-exercise exercise-submit" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
        </div>
              </div>
              <div className="modal-footer">
                <button onClick={this.handleClick} type="button" className="btn btn-warning color-white add-exercise">Add Exercise</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">Create Workout</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="modal-body">
                  <label htmlFor="workoutName" className="form-label">
                    Workout Name
                  </label>
                  <input
                    required
                    autoFocus
                    id="workoutName"
                    type="text"
                    name="workoutName"
                    onChange={this.handleChange}
                    placeholder="Name"
                    className="form-control bg-light" />
                  <label htmlFor="muscleGroup" className="form-label">
                    Muscle Group
                  </label>
                  <input
                    required
                    autoFocus
                    id="muscleGroup"
                    type="text"
                    name="muscleGroup"
                    onChange={this.handleChange}
                    placeholder="Muscle"
                    className="form-control bg-light" />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-warning color-white" data-bs-dismiss="modal">Add Workout</button>
                </div>
              </form>
            </div>
          </div>
        </div>

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
                <div className='col text-center'>
                  <button type="button" className="btn btn-warning btn-sm background-color-yellow ms-2 " data-bs-toggle="modal" data-bs-target="#addModal">
                    Add
                  </button>
                </div>
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
