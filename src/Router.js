import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/pages/home/home';
import Books from './components/pages/books/index';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/books">
          <Books />
        </Route>
      </Switch>
    </Router>
  );
}