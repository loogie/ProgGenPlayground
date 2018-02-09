import React from 'react';
import {connect} from 'react-redux';

class Toolbar extends React.Component {

    beginAction(actionName){
        this.props.dispatch({type:"CHANGE_CURRENT_ACTION", actionName});
    }

    toolAction(actionName){
        this.props.dispatch({type:"CHANGE_CURRENT_ACTION", actionName});
        this.props.dispatch({type:"TOOL_ACTION"});
    }

    render(){
        let ss = {"color": this.props.tool.color};

        return (
            <div className="toolbar">
                <div style={ss}>{(this.props.tool.active)?this.props.tool.active:"None"}</div>
                <button onClick={()=>this.toolAction("color")}>Color</button>
                <button onClick={()=>this.beginAction("roomstart")}>Room</button>
                <button onClick={()=>this.beginAction("split")}>Split</button>
                <button onClick={()=>this.beginAction("startBuilding")}>Building</button>
                <button onClick={()=>this.beginAction("randomRoom")}>Room</button>
                <button onClick={()=>this.beginAction("drawBlock")}>Blocks</button>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        tool: state.tool
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);