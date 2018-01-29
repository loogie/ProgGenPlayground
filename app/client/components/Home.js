import React from "react";
import fetch from 'isomorphic-fetch';
import { Stage, Layer, Rect, Text } from 'react-konva';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import Map from "./Map";

// Home page component
class Home extends React.Component {
  constructor(props){
    super(props);
    
  }

  // render
  render() {
    return (
      <div className="page-home">
        <Map />
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    mystuff: state.mystuff,
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    dispatch
  }
}

export default connect()(Home);
