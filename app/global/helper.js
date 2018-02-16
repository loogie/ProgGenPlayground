const Promise = require('bluebird');
const uuidv1 = require('uuid/v1');

let Helper = {};

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
Helper.getRandom = (min, max)=>{
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
Helper.getRandomInt = (min, max)=>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Helper.findIndexOfItemInArray = (array, idValue, idPropName)=>{
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

Helper.findItemInArray = (array, idValue, idPropName)=>{
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

module.exports = Helper;