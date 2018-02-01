import React from "react";
import fetch from 'isomorphic-fetch';
import { Stage, Layer, Rect, Text } from 'react-konva';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import Menu from './story/Menu';

// Home page component
class Story extends React.Component {
  constructor(props){
    super(props);
    
  }

  // render
  render() {
    return (
      <div className="page-home">
        <div className="story-hud">
            <div className="header">
            </div>
            <div className="main">
                <Menu />
                <div className="main">
                </div>
                <div className="right">
                </div>
            </div>
            <div className="footer">
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    //mystuff: state.mystuff,
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    dispatch
  }
}

export default connect()(Story);
