import React from 'react';
import Chart from 'chart.js/auto';
import CalculateAge from './age';

import { Doughnut } from 'react-chartjs-2';
Chart.register();

export default class MacroForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      weight: '',
      height: '',
      birthday: ''
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
    fetch('/api/info', req)
      .then(res => res.json())
      .then(data => {
        this.setState({ gender: data[0].sex });
        this.setState({ weight: data[0].weight });
        this.setState({ height: data[0].height });
        this.setState({ birthday: data[0].birthday });
      }
      );
  }

  render() {
    const fullAge = <CalculateAge birthday={this.state.birthday}/>;
    const kg = this.state.weight * 0.45359237;
    const cm = this.state.height * 2.54;
    let bmr;
    if (this.state.gender === 'male') {
      bmr = Math.ceil(66.5 + (13.75 * kg) + (5.003 * cm) - (6.75 & fullAge));
    } else {
      bmr = Math.ceil(655.1 + (9.563 * kg) + (1.850 * cm) - (4.676 * fullAge));
    }
    const protein = Math.ceil((bmr * 0.35) / 4);
    const carbs = Math.ceil((bmr * 0.45) / 4);
    const fat = Math.ceil((bmr * 0.2) / 9);

    const state = {
      labels: ['Protein', 'Carbs', 'Fats'],
      datasets: [
        {
          label: 'Macros',
          backgroundColor: [
            '#FF4069',
            '#FFCD56',
            '#36A2EB'
          ],
          hoverBackgroundColor: [
            '#FF4069',
            '#FFCD56',
            '#36A2EB'
          ],
          data: [protein, carbs, fat]
        }
      ]
    };
    return (
      <React.Fragment>
        <div>
          <div className='row chart'>
            <div className='col'>
              <Doughnut
                data={state}
                options={{
                  title: {
                    display: true,
                    text: 'Daily Macros',
                    fontSize: 20
                  },
                  legend: {
                    display: true,
                    position: 'right'
                  }
                }}
              />
            </div>
          </div>
        </div>
        <h1 className='color-white text-center'>Macros</h1>
        <div className='col color-black background-light-grey rounded macros'>
          <div className='row mt-3 p-3 rounded'>
            <div className='col inter-heavy'>BMR: </div>
            <div className='col inter-heavy text-center rounded-pill'>{bmr} Calories</div>
          </div>
        </div>
        <div className='col color-black background-light-grey rounded macros'>
          <div className='row mt-3 p-3 rounded'>
            <div className='col inter-heavy'>Protein: </div>
            <div className='col inter-heavy'><div className='text-center macros-bubble rounded-pill background-color-pink'>{protein}g</div></div>
          </div>
        </div>
        <div className='col color-black background-light-grey rounded macros'>
          <div className='row mt-3 p-3'>
            <div className='col inter-heavy'>Carbs: </div>
            <div className='col inter-heavy text-end'><div className='text-center macros-bubble rounded-pill background-color-light-yellow'>{carbs}g</div></div>
          </div>
        </div>
        <div className='col color-black background-light-grey rounded macros'>
          <div className='row mt-3 p-3'>
            <div className='col inter-heavy'>Fats: </div>
            <div className='col inter-heavy text-end'><div className='text-center macros-bubble rounded-pill background-color-light-blue'>{fat}g</div></div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}
