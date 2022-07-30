import React from 'react';
import Chart from 'chart.js/auto';

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
        // this.setState({ loading: false });
      }
      );
  }

  render() {
    const splity = this.state.birthday.split('-');
    const parsed = parseInt(splity[0]);
    const newDate = new Date();
    const stringDate = JSON.stringify(newDate);
    const splitDate = stringDate.split('-');
    const almost = splitDate[0].replace("'", '');
    const nearly = almost.replace('"', '');
    const done = parseInt(nearly);
    const fullAge = done - parsed;
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
        <div className='row mb-4 row-macro'>
          <div className='col'>
        <div className='text-center rounded-pill'>BMR: {bmr} Calories</div>
          </div>
        </div>

        <div className='row mb-4 row-macro'>
          <div className='col color-white text-center macros rounded-pill'><span>Protein</span>: <span>{protein} Grams</span>
          </div>
        </div>
        <div className='row mb-4 row-macro'>
          <div className='col color-white text-center macros rounded-pill'><span>Carbs</span>: <span>{carbs} Grams</span>
          </div>
        </div>
        <div className='row mb-4 row-macro'>
          <div className='col color-white text-center macros rounded-pill'><span>Fats</span>: <span>{fat} Grams</span>
          </div>
        </div>

      </React.Fragment>
    );
  }
}
