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
      savedData: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
    if (event.target.value === '') {
      this.setState({ todos: this.state.savedData });
    }
  }

  handleClick() {
    for (let x = 0; x < this.state.todos.length; x++) {
      if (this.state.query.toLowerCase() === this.state.todos[x].name.toLowerCase()) {
        this.setState({ todos: this.state.todos[x] });
      }
    }
  }

  componentDidMount() {
    fetch('/api/exercises')
      .then(response => response.json())
      .then(data => {
        this.setState({ savedData: data });
        this.setState({ todos: data });
        this.setState({ loading: false });

      }
      );
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
                  <button onClick={this.handleClick} type="button" className="btn btn-warning btn-sm background-color-yellow ms-2">Add</button>
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
