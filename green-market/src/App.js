import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup' ; 
import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  return (
    <div>
      <h1>Your React App</h1>
      <Signup />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

