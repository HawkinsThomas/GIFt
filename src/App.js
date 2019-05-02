import React, { Component } from 'react';
import {hot} from 'react-hot-loader';
import Interface from './interface.js';
//import {MenuButton} from './button.js'
import './App.css';
import './css/bootstrap.min.css';
import './css/index.css';




class App extends Component{

  render(){
    return(
      <div className='App'>
        <Interface></Interface>
      </div>
    );
  }
}

export default hot(module) (App);