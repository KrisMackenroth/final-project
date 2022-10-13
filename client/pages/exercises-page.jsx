import React from 'react';
import WorkoutList from '../components/workout-list';
import TemporaryDrawer from '../components/navbar';

export default class ExercisesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: true,
      query: '',
      setQuery: '',
      savedData: '',
      muscleGroup: '',
      exerciseName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleChange(event) {
    if (event.target.classList.contains('search')) {
      this.setState({ query: event.target.value });
      if (event.target.value === '') {
        this.setState({ todos: this.state.savedData });
      }
    } else {
      const { name, value } = event.target;
      this.setState({ [name]: value });
      fetch('/api/exercises')
        .then(response => response.json())
        .then(data => {
          this.setState({ savedData: data });
          this.setState({ todos: data });
          this.setState({ loading: false });
        }
        );
    }
  }

  getData() {
    fetch('/api/exercises')
      .then(response => response.json())
      .then(data => {
        this.setState({ savedData: data });
        this.setState({ todos: data });
        this.setState({ loading: false });
      }
      );
  }

  handleSubmit(event) {
    this.setState({ loading: true });
    event.preventDefault();
    const token = window.localStorage.getItem('react-context-jwt');
    const info = {
      name: this.state.exerciseName,
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
    fetch('/api/exercises', req)
      .then(res => res.json())
      .then(result => {
        this.getData();
      });
  }

  handleClick() {
    for (let x = 0; x < this.state.todos.length; x++) {
      if (this.state.query.toLowerCase() === this.state.todos[x].name.toLowerCase()) {
        this.setState({ todos: this.state.todos[x] });
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    let listItems;
    if (this.state.todos.length > 1) {
      listItems = this.state.todos.map(exercise =>
      <WorkoutList key={exercise.workoutId} muscleGroup={exercise.muscleGroup} name={exercise.name}/>
      );
    } else {
      listItems = <WorkoutList key={this.state.todos.workoutId} muscleGroup={this.state.todos.muscleGroup} name={this.state.todos.name} />;
    }
    const best = <TemporaryDrawer />;
    let items;

    if (this.state.loading) {
      items = <div className='text-center'>Loading</div>;
    } else {
      items = listItems;
    }
    return (
      <React.Fragment>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Exercise Info</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={this.handleSubmit}>
              <div className="modal-body">
                  <label htmlFor="exerciseName" className="form-label">
                    Exercise Name
                  </label>
                  <input
                    required
                    autoFocus
                    id="exerciseName"
                    type="text"
                    name="exerciseName"
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
                  <button type="submit" className="btn btn-warning color-white" data-bs-dismiss="modal">Add Exercise</button>
              </div>
              </form>
            </div>
          </div>
        </div>
        <nav className="navbar background-light-grey sticky-top">
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
              <h1 className='color-white text-center mb-5 pt-4'>Exercises</h1>
              <div className="row">
                <div className='col text-center d-flex justify-content-center mb-5'>
                  <label htmlFor="exampleFormControlInput1" className="form-label"></label>
                  <input onChange={this.handleChange} type="search" className="form-control d-inline search" id="exampleFormControlInput1"></input>
                  <button onClick={this.handleClick} type="button" className="btn btn-warning btn-sm background-color-yellow ms-2">Search</button>
                </div>
              </div>
              <div className='row'>
                <div className='col color-white text-center'>Name</div>
                <div className='col text-center'>
                  <button type="button" className="btn btn-warning btn-sm background-color-yellow ms-2 " data-bs-toggle="modal" data-bs-target="#exampleModal">
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
