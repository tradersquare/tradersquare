import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';
import FilterNav from './filter_nav';
import LoginNav from './login';



export default class Header extends Component {

  render() {
    return (<div>
      <nav className="navbar navbar-light bg-faded justified">
        <h1 className="heading"><Link className="navbar-link" to="/">TraderSquare</Link></h1>
        <div className="col-md-8">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <FilterNav />
          </li>
          <li className="nav-item">
            <StratNav />
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
        </ul>
        </div>

        <div className="col-md-4">
          <SearchBar />
        </div>
      </nav>
</div>)
    // return (
    //   <div className="">
    //      <div className="row header">
    //       <h1 className="heading col-md-5"><Link to="/">TraderSquare</Link></h1>
    //      </div>
    //     <ul className="nav nav-tabs">
    //       <li role="presentation" className="active"><Link to="/">TraderSquare</Link></li>
    //       <li role="presentation"><Link to="/filterview">Pick Stocks</Link></li>
    //       <li role="presentation"><a href="#">Messages</a></li>
    //     </ul>
    //   </div>)

    // return (
    //     <div className="row header">
    //       <h1 className="heading col-md-5"><Link to="/">TraderSquare</Link></h1>
    //       <div className="col-md-3 top-padding">
    //         <SearchBar/>
    //       </div>
    //       <div className="col-md-3 top-padding">
    //         <table>
    //           <tbody>
    //             <tr>
    //               <th>
    //                 <StratNav/>
    //               </th>
    //               <th>
    //                 <FilterNav/>
    //               </th>
    //             </tr>
    //           </tbody>
    //         </table>

    //       </div>

    //       <div className="col-md-1 top-padding">
    //         <LoginNav/>
    //       </div>
    //     </div>
    // )
  }

}



