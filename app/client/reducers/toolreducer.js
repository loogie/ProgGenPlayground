export default function toolreducer(state={color:"#000000"}, action){
    switch(action.type){
        case "CHANGE_COLOR":
            return Object.assign({}, state, {color: action.color});
        case "CHANGE_CURRENT_ACTION":
            return Object.assign({}, state, {active: action.actionName, props:action.props});
        case "CLEAR_CURRENT_ACTION":
            return Object.assign({}, state, {active: null, props:null});
        default:
        return state;
    }
}
