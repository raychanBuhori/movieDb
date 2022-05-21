import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { history } from './history';
import './styles/index.scss';

import Genres from './pages/Genres';
import MovieList from 'pages/MovieList';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Genres} />
        <Route path='/movies' component={MovieList} />
      </Switch>
    </Router>
  );
}

export default App;
