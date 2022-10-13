import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      query: '',
      setQuery: '',
      savedData: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData() {
    fetch('/api/exercises')
      .then(response => response.json())
      .then(data => {
        this.setState({ savedData: data });
        this.setState({ todos: data });
      }
      );
  }

  handleChange(event) {
    if (event.target.classList.contains('search')) {
      this.setState({ query: event.target.value });
      if (event.target.value === '') {
        this.setState({ todos: this.state.savedData });
      }
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
    this.getData();
  }

  render() {

    return (
      <div className='col text-center d-flex justify-content-center mb-5'>
        <label htmlFor="exampleFormControlInput1" className="form-label"></label>
        <input onChange={this.handleChange} type="search" className="form-control d-inline search" id="exampleFormControlInput1"></input>
        <button onClick={this.handleClick} type="button" className="btn btn-warning btn-sm background-color-yellow ms-2">Search</button>
      </div>
    );
  }
}
