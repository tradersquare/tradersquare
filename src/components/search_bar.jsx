import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getData} from '../actions/index'; 

export default function() {
  return (
    <div>
      <input placeholder="Enter a Ticker here"></input>
    </div>
  )
}
