import React,{ Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    //Component was just rendered
    componentDidMount(){
      this.accessCheck();
    }

    //Component was just given new props
    componentDidUpdate(){
      this.accessCheck();
    }

    accessCheck(){
      if(!this.props.auth){
        this.props.history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props}/>;
    }
  }

  function mapStateToProps(state) {
    return {auth: state.auth.authenticated};
  }

  return connect(mapStateToProps)(ComposedComponent);
};
