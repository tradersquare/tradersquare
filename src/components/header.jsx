import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';
import FilterNav from './filter_nav';
import LoginNav from './login';



export default class Header extends Component {

  render() {
    return (<div className="">
      <nav className="navbar navbar-toggleable-md navbar-light  col-md-12" >
        <h1 className="heading col-md-3"><Link className="navbar-link" to="/">TRADERSQUARE</Link></h1>

        <div className="col-md-6">
          <ul className="nav navbar-nav col-md-12">
            <li className="nav-item">
              <FilterNav />
            </li>
            <li className="nav-item">
              <StratNav />
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <LoginNav />
            </li>
          </ul>
        </div>

        <div className="col-md-3">
          <SearchBar />
        </div>
      </nav>
</div>)
  }

}



