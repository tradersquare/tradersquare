import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

export default {
  /**
   * { determines the color of the card based on percentile }
   *
   * @param      {whether above or below is a bad number, 1 or -1}  direction  The direction
   * @param      {pass value}  x          { parameter_description }
   * @param      {data that needs to load before evaluation}  data     The object
   * @param      {the metric we are examining}  metric     The metric
   */
  cardColor(direction, x, data, metric){
    if(data){
      if(data[metric].percentile > x){
        return direction === 1 ? "green" : "red"
      }
      else{
        return direction === -1 ? "green" : "red"
      }
    }
  },

  testfunc(){
    console.log("called")
    return (
      <div>
      <h1>something</h1>
      </div>
      )
  }




}