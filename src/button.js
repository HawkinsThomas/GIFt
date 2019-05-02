import React, { Component } from 'react';
import {hot} from 'react-hot-loader';
import './css/bootstrap.min.css';
import './css/index.css';

function MenuButton(props){
  return(
    <button id={props.id} className={props.className} handleClick={props.onClick}>{props.desc}</button>
  );
}

export default hot(module) (MenuButton);