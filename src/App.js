import React, { Component } from 'react';
import {hot} from 'react-hot-loader';
//import {MenuButton} from './button.js'
import './App.css';
import './css/bootstrap.min.css';
import './css/index.css';
import img from '../public/img/GIFtlogo1.0@3x.png'


function MenuButton(props) {
  return(
    <button id={props.id} className={props.className} onClick={props.onClick}>{props.desc}</button>
  );
}


class App extends Component{

  render(){
    return(
      <div className='App'>
        <img src={img}></img>
        <h1>Hello, World!</h1>
        <MenuButton desc='Trendingggggg' onClick={()=> {alert('you clicked the button');}} id='trending_button' className='btn btn-warning'/>
      </div>
    );
  }
}

export default hot(module) (App);