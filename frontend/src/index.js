import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Submitted from './Submitted'
import Home from './Home';
import Create from './Create'
import Created from './Created'
import About from './About'
import NoForm from './NoForm'
import NoMatch from './NoMatch'
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/form/:form_id" component={App} />
      <Route exact path="/submitted" component={Submitted} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/created" component={Created} />
      <Route exact path="/about" component={About} />
      <Route exact path="/no-form" component={NoForm} />
      <Route exact component={NoMatch} />
    </Switch>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
