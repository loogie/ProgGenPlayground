import Promise from 'bluebird';
import uuidv1 from 'uuid/v1';

const TILE_SIZE = 16;

export const DIR = [0, 1, 2, 3];

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRoomID(){
    return uuidv1();
}

export function buildRoom(room){
    return {
        x: room.x * TILE_SIZE,
        y: room.y * TILE_SIZE,
        w: room.w * TILE_SIZE,
        h: room.h * TILE_SIZE
    }
}

export function findIndexOfItemInArray(array, idValue, idPropName){
    if (idPropName == null){
        for (let i = 0; i < array.length; i++){
            let item = array[i];
            if (item == idValue){
                return i;
            }
        }
    }
    else {
        for (let i = 0; i < array.length; i++){
            let item = array[i];
            if (item[idPropName] == idValue){
                return i;
            }
        }
    }    

    return -1;
}

export function findItemInArray(array, idValue, idPropName){
    if (idPropName == null){
        array.forEach((item)=>{
            if (item[idPropName] == idValue){
                return item;
            }
        });
    }
    else {
        array.forEach((item)=>{
            if (item[idPropName] == idValue){
                return item;
            }
        });
    }

    return null;
}