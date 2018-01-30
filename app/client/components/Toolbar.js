import React from 'react';
import {connect} from 'react-redux';

class Toolbar extends React.Component {

    beginAction(actionName){
        this.props.dispatch({type:"CHANGE_CURRENT_ACTION", actionName});
    }

    render(){
        return (
            <div className="toolbar">
                <button onClick={()=>this.beginAction("tetris")}>Tetris</button>
            </div>
        );
    }
}

export default connect()(Toolbar);