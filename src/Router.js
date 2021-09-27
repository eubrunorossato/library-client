import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Books from './components/pages/books/index';
import RegisterBook from './components/pages/registerBooks/index';
import Header from './components/shared/header/header';

export default function Routes() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Books} />
      <Route exact path="/register-book" component={RegisterBook} />
    </Router>
  );
}