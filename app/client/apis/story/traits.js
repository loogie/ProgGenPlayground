import * as Helper from "../helper";

const traits = {
    "person": {
        "appearance": {
            "body": ["wirey", "thin", "stout", "strong", "sickly", "obese"],
            "hair": ["blonde", "brown", "black", "red"],
            "eyes": ["blue", "green","brown"]
        },
        "mind": ["booksmart", "streetsmart", "intelligent", "slow"],
        "personality":{
            "good": ["clever", "social", "happy", "sweet", "helpful"],
            "bad": ["brooding", "angry", "spiteful", "anxious"]
        }
    },
    "relationship":{
        "good": ["respectful", "adoration", "admiriation", "civil", "best friend"],
        "bad": ["angry", "jealous", "spiteful", "hatred"]
    }
}

export function getTrait(obj, props){
    let result = getTraitArray(obj, props);

    while (result.constructor === Object){
        //get property options;
        let options = Helper.getPropArray(result);
        //get random property
        let index = Helper.getRandom(0, options.length);
        //save property to list
        props.push(options[index]);
        //get new result
        result = getTraitArray(obj, props);
    }

    console.log("TEST");
    if (result.constructor === Array){
        let index = Helper.getRandom(0, result.length);
        return {"result": result[index],"props": props };
    }

    return null;
}

export function doesObjectHaveTrait(traits, obj, trait){

}

export function getTraitArray(obj, props){
    let current = obj;
    for (let i = 0; i < props.length; i++){
        let prop = props[i];
        current = current[prop];
        if (!current){
            return null;
        }
    }
    
    return current;
}

export function getArrayNoDups(array, not){
    let search = array;
    if (not){
        for (let i = 0; i < not.length; i++){
            let n = not[i];
            for(let j = 0; j < search.length; j++){
                let a = search[j];
                if (n == a){
                    search.splice(j, 1);
                    break;
                }
            }
        }
    }

    return search;
}