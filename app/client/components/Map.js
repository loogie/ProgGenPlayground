import React from "react";
import { Stage, Layer, Rect, Text } from 'react-konva';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import * as Helper from '../apis/helper';

let room = {};

// Home page component
class Map extends React.Component {
  constructor(props){
    super(props);
    
    let size = props.size;
    let tileSize = props.tileSize;
    let tileColor = props.tileColor;

    if (!size){
        size = 50;
    }

    if (!tileSize){
        tileSize = 16;
    }

    if (!tileColor){
        tileColor = Konva.Util.getRandomColor();
    }

    this.state = {
        selection:{},
        tileSize,
        tileColor,
        size,
        rooms: []
    }
  }

  move(e){
      let index = {
          x: e.evt.clientX,
          y: e.evt.clientY
      }

      this.props.dispatch({type:"MAP_MOUSE_MOVE", pos:index})
  }

  click(e){
    this.props.dispatch({type:"MAP_MOUSE_CLICK", event: e});
  }

  // render
  render() {
    let rooms = this.props.map.rooms.map((room, index)=>{
        return <Rect key={"room_" + index} x={room.x} y={room.y} width={room.w} height={room.h} fill={room.c} />
    });

    let sel = this.state.selection;
    let selObj = (sel)?(<Rect key={"selection"} x={sel.x} y={sel.y} width={sel.w} height={sel.h} stroke={"red"} />):null;

    return (
        <Stage className="map" width={window.innerWidth} height={window.innerHeight} onClick={(e)=>this.click(e)} onMouseMove={(e)=>this.move(e)}>
            <Layer>
                <Rect x={0} y={0} width={window.innerWidth} height={window.innerHeight} fill={"#efefef"}/>
            </Layer>
            <Layer >{rooms}</Layer>
            <Layer >{selObj}</Layer>
        </Stage>
      
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    map: state.map,
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
