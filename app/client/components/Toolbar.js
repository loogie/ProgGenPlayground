import React from 'react';
import {connect} from 'react-redux';

class Toolbar extends React.Component {

    beginAction(actionName){
        this.props.dispatch({type:"CHANGE_CURRENT_ACTION", actionName});
    }

    render(){
        return (
            <div className="toolbar">
                <div>{(this.props.tool.active)?this.props.tool.active:"None"}</div>
                <button onClick={()=>this.beginAction("roomstart")}>Room</button>
                <button onClick={()=>this.beginAction("split")}>Split</button>
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