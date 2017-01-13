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
        {/*<p className="col-md-3"><span className="top-padding">powered by </span><a className="navbar-link" href="https://intrinio.com/"><img src="http://9304-presscdn-0-32.pagely.netdna-cdn.com/wp-content/uploads/2015/08/Logo.png" height="30"/></a></p>*/}

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



