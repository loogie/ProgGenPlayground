import uuidv1 from 'uuid/v1';

const TILE_SIZE = 16;

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