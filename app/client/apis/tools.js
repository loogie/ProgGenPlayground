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
    console.log("TEST");
    try{
        let state = store.getState();
        let rooms = [];
        let start = CreateGridRoom(pos.x, pos.y, 1, 1, Konva.Util.getRandomColor());

        rooms.push(start);
        let room = start;

        for (let i = 0; i < 3; i++){
            let rand = Helper.getRandom(0, rooms.length);            
            let roomPos = getGridPos({x:room.x, y:room.y});

            console.log(roomPos);

            let up = {x:roomPos.x, y: roomPos.y-1};
            let right = {x:roomPos.x-1, y: roomPos.y};
            let down = {x:roomPos.x, y: roomPos.y+1};
            let left = {x:roomPos.x+1, y: roomPos.y};

            let  valid = [0, 1, 2, 3];
            for(let i = 0;i < state.map.rooms.length; i++){
                let croom = getGridPos({x:state.map.rooms[i].x, y:state.map.rooms[i].y});

                if (up.x == croom.x && up.y == croom.y){
                    removeFromArray(valid, 0);
                }

                if (right.x == croom.x && right.y == croom.y){
                    removeFromArray(valid, 1);
                }

                if (down.x == croom.x && down.y == croom.y){
                    removeFromArray(valid, 2);
                }

                if (left.x == croom.x && left.y == croom.y){
                    removeFromArray(valid, 3);
                }
            }

            let random = Helper.getRandom(0, valid.length);
            let dir = valid[random];

            let newRoom = null;
            switch(dir){
                case 0:
                    console.log("UP");
                    newRoom =CreateGridRoom(up.x, up.y, 1, 1, Konva.Util.getRandomColor());
                    break;
                case 1:
                    console.log("RIGHT");
                    newRoom =CreateGridRoom(right.x, right.y, 1, 1, Konva.Util.getRandomColor());
                    break;
                case 2:
                    console.log("DOWN");
                    newRoom =CreateGridRoom(down.x, down.y, 1, 1, Konva.Util.getRandomColor());
                    break;
                case 3:
                    console.log("RIGHT");
                    newRoom =CreateGridRoom(left.x, left.y, 1, 1, Konva.Util.getRandomColor());
                    break;
            }

            rooms.push(newRoom);
            room = newRoom;
        }
    }
    catch (err){
        console.log("ERROR");
        console.log(err);
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