import {store} from '../store';
import * as Helper from './helper';

export const TILE_SIZE = 16;
export const MIN_ROOM_SIZE = 3;

export function* performAction(action){
    let state = store.getState();

    let pos = {x: action.action.event.evt.clientX, y: action.action.event.evt.clientY};

    switch (state.tool.active){
        case "roomstart":
            let startPos = getGridPos(pos);
            store.dispatch({type:"CHANGE_CURRENT_ACTION", actionName:"roomend", props:{startPos}});
            break;
        case "roomend":
            let sp = state.tool.props.startPos;
            let ep = getGridPos(pos);

            let w = Math.abs(ep.x - sp.x);
            let h = Math.abs(ep.y - sp.y);

            if (sp.x, sp.y, w, h){
                createRoom(sp.x, sp.y, w, h);
            }

            store.dispatch({type:"CLEAR_CURRENT_ACTION"});
            break;
        case "split":
            pos = getGridPos(pos);

            let room = getRoomAt(pos.x, pos.y);

            if (room){
                splitRoom(room);
            }
            else {
                console.log("no room found");
                throw Error("No room found");
            }

            store.dispatch({type:"CLEAR_CURRENT_ACTION"});
            break;
    }
}

function mergeRooms(room1, room2){
    let rm = {

    }
}

function splitRoom(room){
    let horiz = (room.w == room.h)?Helper.getRandom(0, 2):((room.w > room.h)?0:1);

    let rm1 = {
        x: room.bounds.l,
        y: room.bounds.t,
        w: (horiz == 0)?(()Math.floor(room.w/2)):room.w,
        h: (horiz == 1)?Math.floor(room.h/2):room.h
    }

    let rm2 = {
        x: (horiz == 0)?(rm1.x + rm1.w): room.x,
        y: (horiz == 1)?(rm1.y + rm1.h): room.y,
        w: (horiz == 0)?(room.w - rm1.w):room.w,
        h: (horiz == 1)?(room.h - rm1.h):room.h
    }

    store.dispatch({type:'MAP_REMOVE_ROOM', 'id': room.id});

    createRoom(rm1.x, rm1.y, rm1.w, rm1.h);
    createRoom(rm2.x, rm2.y, rm2.w, rm2.h);
}

function createRoom(x, y, w, h){
    let cells = [];
    let c = Konva.Util.getRandomColor();
    let id = Helper.getRoomID();

    let roomObj = {
        id,
        x, y, w, h,
        bounds: getBounds(x, y, w, h),
        c
    }

    store.dispatch({type:'MAP_ADD_ROOM', 'room':roomObj});

    return roomObj;
}

function getBounds(x, y, w, h){
    let bounds = {
        t: y,
        l: x,
        r: x + (w - 1),
        b: y + (h - 1),
    }

    return bounds;
}

function getRoomById(id){
    let state = store.getState();

    for(let i = 0; i < state.map.rooms.length; i++){
        let rm = state.map.rooms[i];

        if (rm.id == id){
            return rm;
        }
    }

    return null;
}

function getRoomAt(x, y){
    let state = store.getState();

    for(let i = 0; i < state.map.rooms.length; i++){
        let rm = state.map.rooms[i];

        if (pointIntersects(x, y, rm.bounds)){
            return rm;
        }
    }

    return null;
}

function getGridPos(pos, x, y){
    if (!pos){
        pos = {x, y};
    }

    return {
        x: (Math.floor(pos.x/TILE_SIZE)),
        y: (Math.floor(pos.y/TILE_SIZE))
    }
}

function pointIntersects(x, y, bounds){
    if (x > bounds.l && x < bounds.r && y > bounds.t && y < bounds.b){
        return true;
    }
    
    return false;
}