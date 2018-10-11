import React, {Component} from 'react';
import * as actions  from '../actions';
import { connect } from 'react-redux';
import requireAuth from './requireAuth';

class Feature extends Component {
  render() {
    return (
       <h3><em>This is a secret</em> it is only viewed if you are logged in.</h3>
    )
  }
}

export default connect(null, actions)(requireAuth(Feature));
