import React from 'react';

function WorkoutList(props) {
  return (
    <div key={props.workoutId} className='row text-center test align-items-center'>
      <div className='col'>
        <li key={props.workoutId}>{props.name}</li>
        <p className='inter'>{props.muscleGroup}</p>

      </div>
      <div className='col'>
        <button type="button" className="btn btn-warning btn-sm background-color-yellow">View</button>

      </div>
    </div>
  );
}

export default WorkoutList;
