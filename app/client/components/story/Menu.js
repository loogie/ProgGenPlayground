import React from "react";
import fetch from 'isomorphic-fetch';
import { Stage, Layer, Rect, Text } from 'react-konva';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

// Home page component
class Story extends React.Component {
  constructor(props){
    super(props);
    
  }

  handleClick(e){
      let v = e.target.value;

      this.props.dispatch({"type":'STORY_ACTION', "value":v});
  }

  // render
  render() {
    return (
        <div className="left menu">
            <button onClick={(e)=>this.handleClick(e)} value="create_person">Create Person</button>
            <button onClick={(e)=>this.handleClick(e)} value="create_place">Create Place</button>
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
