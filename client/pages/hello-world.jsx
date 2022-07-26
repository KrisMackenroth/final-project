import React from 'react';
import WorkoutList from '../components/workout-list';

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: true
    };
  }

  componentDidMount() {
    fetch('/api/exercises')
      .then(response => response.json())
      .then(data => {
        this.setState({ todos: data });
        this.setState({ loading: false });
      }
      );
  }

  render() {
    const listItems = this.state.todos.map(exercise =>
      <WorkoutList key={exercise.workoutId} muscleGroup={exercise.muscleGroup} name={exercise.name}/>
    );

    let items;

    if (this.state.loading) {
      items = <div className='text-center'>Loading</div>;
    } else {
      items = listItems;
    }
    return (
      <React.Fragment>
        <h1 className='color-white text-center mb-5 pt-4'>Exercises</h1>
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
      </React.Fragment>
    );
  }
}
