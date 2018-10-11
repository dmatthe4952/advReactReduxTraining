import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './HeaderStyle.css';

class Header extends Component{

  renderLinks() {
    if (!this.props.authenticated) {
      return (
        <span>
          <Link to='/signup'>Sign up</Link>
          <Link to='/signin'>Sign in</Link>
        </span>
      );
    } else {
      return(
          <span>
            <Link to='/signout'>Sign out</Link>
            <Link to='/feature'>Feature</Link>
          </span>
        );
    }
  };


  render() {
    return (
      <div className='header'>
        <Link to='/'>Redux Auth</Link>
        { this.renderLinks() }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps)(Header);
