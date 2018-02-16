import React from "react";
import fetch from 'isomorphic-fetch';
import { Stage, Layer, Rect, Text } from 'react-konva';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import * as World from "../apis/story";


// Home page component
class Story extends React.Component {
  constructor(props){
    super(props);
    World.Init();
  }

  descTest1(){
    let descs = [];
    descs.push(World.GetRandomDesc(["age"]));
    descs.push(World.GetRandomDesc(["hair"]));
    descs.push(World.GetRandomDesc(["eyes"]));
    descs.push(World.GetRandomDesc(["physical"], descs));
    descs.push(World.GetRandomDesc(["physical"], descs));
    descs.push(World.GetRandomDesc(["mental"], descs));
    descs.push(World.GetRandomDesc(["mental"], descs));

    console.log(descs);
  }

  // render
  render() {
    return (
      <div>
        <div style={{"display":"flex", "flexFlow":"column"}}>
          <div style={{"display":"flex", "flexFlow":"row"}}><div ref="desc">Descriptor Test</div><button onClick={()=>this.descTest1()}>Run</button></div>
        </div>
      </div>
      /*<div className="page-home">
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
      </div>*/
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
