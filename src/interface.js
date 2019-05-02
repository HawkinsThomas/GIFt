import React, { Component } from 'react';
import {hot} from 'react-hot-loader';
import './App.css';
import './css/bootstrap.min.css';
import './css/index.css';
import img from '../public/img/GIFtlogo1.0@3x.png'


function MenuButton(props) {
  return(
    <button 
      id={props.id} 
      className={props.className} 
      onClick={props.onClick}
    >
      <i class={props.iconClass}></i>{props.desc}
    </button>
  );
}

function Logo(props) {
  return(
    <div className="container mb-3 col-sm-6 offset-sm-3 col-md-4 offset-md-4">
      <div class="container-fluid col-6 text-center col-sm-6 col-md-6 offset-md-3 ">
        <img id="logo" src={props.src} alt={props.alt}/>          
      </div>
    </div>
  );
}

function SearchForm(props){
  return(
    <form id="search_form">
      <div class="form-row">
        <div class=" col-12 col-md-6 offset-md-3 col-sm-6 offset-sm-3">
          <input type="search" class="form-control" placeholder="Search for GIFs" id="search_bar"/>
        </div>
      </div>
      <div class="form-row justify-content-center col-12 col-sm-12 col-md-12 col-lg-12  ">
        <MenuButton desc='Search' onClick={()=> {alert('click');}} id='search_button' className='btn btn-success' iconClass='fas fa-search'/>
        <MenuButton desc='Random' onClick={()=> {alert('click');}} id='random_button' className='btn btn-primary' iconClass='fas fa-random'/>
        <MenuButton desc='Trending' onClick={()=> {alert('click');}} id='trending_button' className='btn btn-warning' iconClass='fas fa-chart-line'/>
      </div>
    </form>
  );
}

class Interface extends Component{

  render(){
    return(
      <div className='Interface'>
        <Logo src={img} alt='App Logo'></Logo>
        <SearchForm/>
      </div>
    );
  }
}

export default hot(module) (Interface);