import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Numeral from 'numeral';

export default {

  handleData(prop, metric, direction, threshold, format) {
    let color = "";
    if(prop[metric].percentile){
      if(prop[metric].percentile > threshold){
        color = direction === 1 ? "green" : "red"
      }
      else{
        color = direction === -1 ? "green" : "red"
      }
    }

    let percentileDisplay = prop[metric].percentile === null ? "" : `percentile: ${prop[metric].percentile}%`; 
    
    let value = Numeral(parseFloat(prop[metric].value) * 100).format(format);


    return {
      color: color,
      percentileDisplay: percentileDisplay,
      value: value
    }
  } 

}