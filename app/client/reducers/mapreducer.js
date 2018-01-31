export default function mapreducer(state={rooms:[]}, action){
    switch(action.type){
        case "MAP_MOUSE_MOVE":
            return Object.assign({}, state, {position: action.pos});
        case "MAP_ADD_ROOM":
            console.log("ADDED ROOM");
            console.log(action.room);

            let rooms = [...state.rooms, action.room];
            return Object.assign({}, state, {rooms});
        case "MAP_REMOVE_ROOM":
            let index = -1;
            for (let i = 0; i < state.rooms.length; i++){
                if (state.rooms[i].id == action.id){
                    index = i;
                }
            }

            if (index != -1){
                console.log("REMOVE ROOM");
                console.log(state.rooms[index]);

                return Object.assign({}, state, {rooms:[...state.rooms.slice(0, index),...state.rooms.slice(index + 1)]});
            }
            else {
                break;
            }
        default:
        return state;
    }
}
  