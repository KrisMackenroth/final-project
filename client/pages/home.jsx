import React from 'react';
import ExercisesPage from '../pages/exercises-page';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

// export default function Home(props) {
//   if (!this.context.user) return <Redirect to="sign-in" />;
//   return (
//     <div>
//       <ExercisesPage />
//     </div>
//   );
// }
// Home.contextType = AppContext;
export default class Home extends React.Component {

  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <div>
        <ExercisesPage />
      </div>
    );
  }
}
Home.contextType = AppContext;
