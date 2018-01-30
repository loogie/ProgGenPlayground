export default function toolreducer(state={}, action){
    switch(action.type){
        case "CHANGE_CURRENT_ACTION":
            return Object.assign({}, state, {active: action.actionName});
        default:
        return state;
    }
}
  