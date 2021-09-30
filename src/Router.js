import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Books from './components/pages/books/index';
import Login from './components/pages/login/index';
import RegisterBook from './components/pages/registerBooks/index';
import Header from './components/shared/header/header';

export default function Routes() {
  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <Route path="/library">
        <Header />
        <Route exact path="/library" component={Books} />
        <Route exact path="/library/register-book" component={RegisterBook} />
      </Route>
    </Router>
  );
}