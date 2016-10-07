import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';
import FilterNav from './filter_nav';
import LoginNav from './login';

export default class Header extends Component {

  render() {
    return (
        <div className="row header">
          <h1 className="heading col-md-5"><Link to="/">TraderSquare</Link></h1>
          <div className="col-md-3 top-padding">
            <SearchBar/>
          </div>
          <div className="col-md-3 top-padding">
            <table>
              <tbody>
                <tr>
                  <th>
                    <StratNav/>
                  </th>
                  <th>
                    <FilterNav/>
                  </th>
                </tr>
              </tbody>
            </table>

          </div>

          <div className="col-md-1 top-padding">
            <LoginNav/>
          </div>
        </div>
    )
  }

}



