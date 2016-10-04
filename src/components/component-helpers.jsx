import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Numeral from 'numeral';

export default {

  handleData(prop, metric, direction, threshold, format) {
    let color = "";
    if(prop[metric].percentile !== null){
      if(prop[metric].percentile > threshold){
        color = direction === 1 ? "green" : "red"
      }
      else{
        color = direction === -1 ? "green" : "red"
      }
    }

    let percentileDisplay = prop[metric].percentile === null ? "" : `percentile: ${prop[metric].percentile}%`; 

    let value = prop[metric].value === "nm" ? "N/A" : Numeral(parseFloat(prop[metric].value)).format(format)



    const obj = {
      color: color,
      percentileDisplay: percentileDisplay,
      value: value
    }
    console.log("OBJ", obj, prop)
    return obj;
  } 

}