import React from 'react';
import MacroForm from '../components/macros-chart';

export default class MacrosPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: true
    };
  }

  componentDidMount() {

  }

  render() {

    return (
      <React.Fragment>
<div>

<MacroForm/>
      </div>
      </React.Fragment>
    );
  }
}
