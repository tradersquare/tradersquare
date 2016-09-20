import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getData} from '../actions/index';
import {Link} from 'react-router';

export default function() {
  return (
    <div>
      <input placeholder="Enter a Ticker here"></input>
      <Link to="/stockview" className="btn btn-primary">
            Results
          </Link>
    </div>
  )
}
