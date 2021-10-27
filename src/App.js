import React from 'react';
import Store from './store/index';
import "react-datepicker/dist/react-datepicker.css";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css';
import 'material-design-icons';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './Router';

function App() {
  return (
    <Store className="App">
      <Routes />
    </Store>
  );
}

export default App;
