import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Numeral from 'numeral';

export default {

  handleData(prop, metric, direction, threshold, format) {
    let color = "";
    if(prop[metric] && (prop[metric].percentile !== null)){
      if(prop[metric].percentile > threshold){
        color = direction === 1 ? "green" : "red"
      }
      else{
        color = direction === -1 ? "green" : "red"
      }
    }

    let percentileDisplay, value;
    if(prop[metric]){
      percentileDisplay = prop[metric].percentile === null ? "" : `percentile: ${prop[metric].percentile}%`;
      value = prop[metric].value === ("nm" || null) ? "N/A" : prop[metric].value
    }

    // console.log(value, percentileDisplay)
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : '50%',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };



    const obj = {
      color: color,
      percentileDisplay: percentileDisplay,
      value: value,
      style: customStyles
    }
    // console.log("OBJ", obj, prop)
    return obj;
  }

}
