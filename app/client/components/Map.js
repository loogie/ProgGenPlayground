import React from "react";
import { Stage, Layer, Rect, Text } from 'react-konva';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

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

  startSelect(e){
    let state = this.state;
    

    this.setState(state);
  }

  clickSelect(e){
      let state = this.state;

      if (state.selection.start){
          console.log("END");
        state.selection.start = null;
      }
      else {
          console.log("START");
        state.selection = {};

        let mousePos = {
            x:  e.evt.clientX,
            y:  e.evt.clientY
        }

        let gridPos = {
            x: (Math.floor(mousePos.x / this.state.tileSize) * this.state.tileSize),
            y: (Math.floor(mousePos.y / this.state.tileSize) * this.state.tileSize)
        }

        state.selection.start = gridPos;
      }

      this.setState(state);
  }

  moveSelect(e){
    if (this.state.selection.start){
        let state = this.state;

        let start = state.selection.start;

        let mousePos = {
            x:  e.evt.clientX,
            y:  e.evt.clientY
        }

        let gridPos = {
            x: (Math.floor(mousePos.x / this.state.tileSize) * this.state.tileSize),
            y: (Math.floor(mousePos.y / this.state.tileSize) * this.state.tileSize)
        }

        let x;
        let w;
        let y;
        let h;

        if (start.x < gridPos.x){
            x = start.x;
            w = gridPos.x - x;
        }
        else {
            x = gridPos.x;
            w = start.x - x
        }

        if (start.y < gridPos.y){
            y = start.y;
            h = gridPos.y - y;
        }
        else {
            y = gridPos.y;
            h = start.y - y
        }

        state.selection.x = x;
        state.selection.y = y;
        state.selection.w = w;
        state.selection.h = h;

        this.setState(state);
    }
  }
    
  endSelect(e){
      let state = this.state;
      state.selection.start = null;

      this.setState(state);
  }

  // render
  render() {
    let rooms = this.state.rooms.map((room, index)=>{
        return <Rect key={"room_" + index} x={room.x} y={room.y} width={room.w} height={room.h} fill={room.color} />
    });

    console.log(rooms);

    let sel = this.state.selection;
    let selObj = (sel)?(<Rect key={"selection"} x={sel.x} y={sel.y} width={sel.w} height={sel.h} stroke={"red"} />):null;

    return (
        <Stage width={window.innerWidth} height={window.innerHeight} onClick={(e)=>this.clickSelect(e)} onMouseMove={(e)=>this.moveSelect(e)}>
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
    mystuff: state.mystuff,
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    dispatch
  }
}

export default connect()(Map);