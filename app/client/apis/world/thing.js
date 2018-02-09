import uuidv1 from "uuid/v1";

export default class Thing {
    constructor(){
        this.id = uuidv1();
    }
}