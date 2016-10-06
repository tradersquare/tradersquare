import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';


class About extends Component {

  render() {
    return (
      <div className="">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 pushdown">
            
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    )
  }
}

export default connect(null, {})(About);
