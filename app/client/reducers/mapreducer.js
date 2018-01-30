export default function mapreducer(state={rooms:[]}, action){
    switch(action.type){
        case "MAP_MOUSE_MOVE":
            return Object.assign({}, state, {position: action.pos});
        case "MAP_ADD_ROOM":
            let rooms = [...state.rooms, action.room];
            return Object.assign({}, state, {rooms});
        default:
        return state;
    }
}
  