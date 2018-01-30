import {store} from '../store';
import * as Helper from './helper';

export const TILE_SIZE = 16;
export const MIN_ROOM_SIZE = 3;

export function* performAction(action){
    let state = store.getState();

    switch (state.tool.active){
        case "tetris":
            let pos = {x: action.action.event.evt.clientX, y: action.action.event.evt.clientY};
            tetrisRoom(getGridPos(pos));
            break;
    }
}

function tetrisRoom(pos, size = 4){
    let firstRoom = CreateGridRoom(pos.x, pos.y, MIN_ROOM_SIZE, MIN_ROOM_SIZE, Konva.Util.getRandomColor());
    console.log("FIRST");
    firstRoom = Object.assign({}, firstRoom, {validDir:[0, 1, 3]});
    console.log(firstRoom.validDir);
    console.log("SECOND");
    let current = [firstRoom];
    
    console.log("LETS DO THIS");

    for(let i = 1; i < size; i++){
        //get random room to start from
        let startIndex = Helper.getRandom(0, current.length);
        let startRoom = current[startIndex];
        let gridPos = getGridPos({x:startRoom.x, y:startRoom.y});
        
        let random = Helper.getRandom(0, startRoom.validDir.length);
        let dir = startRoom.validDir[random];

        let newPos = null;

        switch(dir){
            case 0:
                newPos = {
                    x: gridPos.x,
                    y: gridPos.y + MIN_ROOM_SIZE
                }
                break;
            case 1:
                newPos = {
                    x: gridPos.x + MIN_ROOM_SIZE,
                    y: gridPos.y
                }
                break;
            case 2:
                newPos = {
                    x: gridPos.x,
                    y: gridPos.y-MIN_ROOM_SIZE
                }
                break;
            case 3:
                newPos = {
                    x: gridPos.x - MIN_ROOM_SIZE,
                    y: gridPos.y
                }
                break;
        }

        let nroom = CreateGridRoom(newPos.x, newPos.y, MIN_ROOM_SIZE, MIN_ROOM_SIZE, Konva.Util.getRandomColor());
        updateValidDir(current, nroom);
        current.push(nroom);
    }
}

export function CreateGridRoom(x, y, w, h, c){
    return CreateRoom(x * TILE_SIZE, y * TILE_SIZE, w * TILE_SIZE, h * TILE_SIZE, c);
}

export function CreateRoom(x, y, w, h, c){
    let room = {x, y, w, h, c};
    store.dispatch({type:"MAP_ADD_ROOM", room});
    return room;
}

function updateValidDir(rooms, room){
    console.log("UPDATE VALID DIR");
    let roomCoord = getGridPos({x:room.x, y:room.y});

    let upCoord = {x:roomCoord.x, y: roomCoord.y + MIN_ROOM_SIZE};
    let rightCoord = {x:roomCoord.x + MIN_ROOM_SIZE, y: roomCoord.y};
    let downCoord = {x:roomCoord.x, y: roomCoord.y - MIN_ROOM_SIZE};
    let leftCoord = {x:roomCoord.x - MIN_ROOM_SIZE, y: roomCoord.y + MIN_ROOM_SIZE};
    
    let validDir = [0, 1, 2, 3];

    for(let i = 0; i < rooms.length; i++){
        let checkRoom = rooms[i];
        let checkCoord = getGridPos({x:checkRoom.x, y:checkRoom.y});

        if (checkCoord == upCoord){
            let cvd = checkroom.validDir;
            removeFromArray(cvd, 2);
            checkRoom = Object.assign({}, checkroom, {"validDir": cvd})
            removeFromArray(validDir, 0);
        }
        
        if (checkCoord == rightCoord){
            let cvd = checkroom.validDir;
            removeFromArray(cvd, 3);
            checkRoom = Object.assign({}, checkroom, {"validDir": cvd})
            removeFromArray(validDir, 1);
        }

        if (checkCoord == downCoord){
            let cvd = checkroom.validDir;
            removeFromArray(cvd, 0);
            checkRoom = Object.assign({}, checkroom, {"validDir": cvd})
            removeFromArray(validDir, 2);
        }
        
        if (checkCoord == leftCoord){
            let cvd = checkroom.validDir;
            removeFromArray(cvd, 1);
            checkRoom = Object.assign({}, checkroom, {"validDir": cvd})
            removeFromArray(validDir, 3);
        }
    }

    room = Object.assign({}, room, {validDir});
}

function removeFromArray(array, item){
    let index = -1;
    for(let i = 0; i < array.length; i++){
        let aitem = array[i];
        if (aitem == item){
            index = i;
            break;
        }
    }

    if (index != -1){
        array.splice(index, 1);
    }
}

function getGridPos(pos){
    return {
        x: (Math.floor(pos.x/TILE_SIZE)),
        y: (Math.floor(pos.y/TILE_SIZE))
    }
}