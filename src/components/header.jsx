import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import SearchBar from './search_bar';
import StratNav from './strategy_nav';
import FilterNav from './filter_nav';
import LoginNav from './login';



export default class Header extends Component {

  render() {
    console.log(...this.props)
        return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
  <div className="mdl-layout__drawer">
    <h3 className="mdl-layout-title">TraderSquare</h3>
    <nav className="mdl-navigation">
      <FilterNav />
      <StratNav />
      <LoginNav />
      <Link className="mdl-navigation__link" to="/about">About</Link>
      
    </nav>
  </div>
  <main className="mdl-layout__content">
    <div className="page-content">
      <div {...this.props}  />
    </div>
  </main>
</div>)

//     return (<div className="">
//       <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800" style={{"backgroundColor": "#B2DFDB"}}>
//         <h1 className="heading col-md-9"><Link className="navbar-link" to="/">TraderSquare</Link></h1>
//         <p className="col-md-3"><span className="top-padding">powered by </span><a className="navbar-link" href="https://intrinio.com/"><img src="http://9304-presscdn-0-32.pagely.netdna-cdn.com/wp-content/uploads/2015/08/Logo.png" height="30"/></a></p>

//         <div className="col-md-8">
//         <ul className="nav navbar-nav col-md-12">
//           <li className="nav-item">
//             <FilterNav />
//           </li>
//           <li className="nav-item">
//             <StratNav />
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/about">About</Link>
//           </li>
//           <li className="nav-item">
//             <LoginNav />
//           </li>
//         </ul>
//         </div>

//         <div className="col-md-4">
//           <SearchBar />
//         </div>
//       </nav>
// </div>)

  }

}



