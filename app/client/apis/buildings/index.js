import * as Helper from "../helper";
import {store} from "../../store";

export const DIR = [0, 1, 2, 3];

export function drawBox(pos, color){
    createRoom(pos.x, pos.y, 1, 1, color);
}

export function createRandomBuilding(pos, dir){
    let w = Helper.getRandomInt(2, 4);
    let h = Helper.getRandomInt(2, 4);

    let incr = {x:0, y:0};
    let offset = {x:0, y:0};

    switch (dir){
        case 0:
            
            break;
        case 1:

            break;
        case 2:

            break;
        case 3:

            break;
    }

    let color = Konva.Util.getRandomColor();

    createRoom(pos.x + offsetx, pos.y + offsety, w, h, color);
}

export function startBuilding(pos, options){
    buildRoom(pos, Helper.getRandomInt(3,4));
}

function buildRoom(pos, blocks){
    let rooms = [createRoom(pos.x - 1, pos.y - 1, 3, 3, Konva.Util.getRandomColor())];
    blocks --;
    let dirs = [0, 1, 2, 3]
    for (let i = 0; i < blocks; i++){
        let index = Helper.getRandom(0,dirs.length);
        let dir = dirs[index];
        let nColor = Konva.Util.getRandomColor();
        let nPos = {x:pos.x, y:pos.y};
        dirs.splice(dirs.indexOf(dir),1);
        console.log(dir);
        switch(dir){
            case 0:
                //dirs.splice(dirs.indexOf(2),1);
                nPos.y -= 3;
                break;
            case 1:
                //dirs.splice(dirs.indexOf(3),1);
                nPos.x -= 3;
                break;
            case 2:
                //dirs.splice(dirs.indexOf(0),1);
                nPos.y += 3;
                break;
            case 3:
                //dirs.splice(dirs.indexOf(1),1);
                nPos.x += 3;
                break;
        }
        rooms.push(createRoom(nPos.x - 1, nPos.y - 1, 3, 3, nColor));
    }
}

function createRoom(x, y, w, h, c){
    let cells = [];
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