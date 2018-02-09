import Thing from "./thing";

export class Person extends Thing {
    constructor(first, last, appearance, mind){
        super();
        this.name = {
            "first":[first],
            "last":[last]
        }
        this.appearance = appearance;
        this.mind = mind;
    }
}