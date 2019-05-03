import React, { Component } from 'react';
import {hot} from 'react-hot-loader';
import './App.css';
import './css/bootstrap.min.css';
import './css/index.css';
import img from '../public/img/GIFtlogo1.0@3x.png'
import navImg from '../public/img/GIFtlogo1.0.svg'


function MenuButton(props) {
  return(
    <button 
      id={props.id} 
      className={props.className} 
      onClick={props.onClick}
    >
      <i className={props.iconClass}></i>{props.desc}
    </button>
  );
}

function Logo(props) {
  return(
    <div className='container mb-3 col-sm-6 offset-sm-3 col-md-4 offset-md-4'>
      <div className='container-fluid col-6 text-center col-sm-6 col-md-6 offset-md-3 '>
        <img id='logo' src={props.src} alt={props.alt}/>          
      </div>
    </div>
  );
}

function SearchForm(props) {
  return(
  
    <div>
      <form id='search_form'>
        <div className='form-row'>
          <div className=' col-12 col-md-6 offset-md-3 col-sm-6 offset-sm-3'>
            <input type='search' className='form-control' placeholder='Search for GIFs' id='search_bar' value={props.value} onChange={props.handleChange}/>
          </div>
        </div>
        <div className='form-row justify-content-center col-12 col-sm-12 col-md-12 col-lg-12  '>
          <MenuButton desc='Search' onClick={()=> {alert('click');}} id='search_button' className='btn btn-success' iconClass='fas fa-search'/>
          <MenuButton desc='Random' onClick={()=> {alert('click');}} id='random_button' className='btn btn-primary' iconClass='fas fa-random'/>
          <MenuButton desc='Trending' onClick={()=> {alert('click');}} id='trending_button' className='btn btn-warning' iconClass='fas fa-chart-line'/> 
        </div>
      </form>
      <button onClick={props.showHide}>Show/Hide</button>
    </div>
  );
}

function Navbar(props) {
  return(
    <div id={props.id} className='container-fluid centerer'>
      <div className='row' id='navBarRow'>
        <div className='col-lg-1 col-md-1 col-sm-4 col-4'>
          <img id='navlogo' src={navImg} alt='nav gift logo'/>
        </div>
        <form id='nav_search_form' className='col-6'>
          <input type='search' className='form-control' placeholder='Search for GIFs' id='nav_search_bar' value={props.value} onChange={props.handleChange}></input>
        </form>
        <div className='col-lg-4 col-md-4 col-sm-12'>
          <MenuButton desc='Search' onClick={()=> {alert('click');}} id='nav_search_button' className='btn btn-success btn-sm navbtn' iconClass='fas fa-search'/>
          <MenuButton desc='Random' onClick={()=> {alert('click');}} id='nav_random_button' className='btn btn-primary btn-sm navbtn' iconClass='fas fa-random'/>
          <MenuButton desc='Trending' onClick={()=> {alert('click');}} id='nav_trending_button' className='btn btn-warning btn-sm navbtn' iconClass='fas fa-chart-line'/>
        </div>
      </div>
    </div>
  );
}

class Interface extends Component{

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      isNavBarVisible: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.navBarVisible = this.navBarVisible.bind(this);
  };

  handleChange(event) {
    this.setState({searchValue: event.target.value});
  };

  navBarVisible() {
    this.setState({isNavBarVisible: !this.state.isNavBarVisible});
  };

  render(){
    return(
      <div className='Interface'>
        <Navbar id={this.state.isNavBarVisible ? 'gift-navbar' : 'gift-navbar-hidden'}value={this.state.searchValue} handleChange={this.handleChange}/>
        <Logo src={img} alt='App Logo'></Logo>
        <SearchForm value={this.state.searchValue} handleChange={this.handleChange} showHide={this.navBarVisible}/>
      </div>
    );
  }
}

export default hot(module) (Interface);