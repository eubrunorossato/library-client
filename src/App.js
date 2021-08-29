import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css';
import 'material-design-icons';
import Routes from './Router';
import Header from './components/shared/header/header';
function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
