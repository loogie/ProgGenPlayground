export default function toolreducer(state={}, action){
    switch(action.type){
        case "CHANGE_CURRENT_ACTION":
            return Object.assign({}, state, {active: action.actionName, props:action.props});
        case "CLEAR_CURRENT_ACTION":
            return Object.assign({}, state, {active: null, props:null});
        default:
        return state;
    }
}
