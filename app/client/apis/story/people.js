import {store} from '../../store';
import * as Helper from '../helper';
import tracery from 'tracery-grammar';
import Traits from './traits';

const relationships = {
    "marriage": {
        req: [
            {name: "man", type: "person", options:{sex:{value:"male", qualifier:"equals"}}},
            {name: "woman", type: "person", options:[
                {field:"sex", qualifier:"equals", value:"female"},
            ]}
        ]
    }
}

const names = tracery.createGrammar({
    "male": ["Richard", "Allan", "Dave", "Henry", "Max", "Theadore"],
    "female": ["Rose", "Dorothy", "Emma", "Margaret", "Elizabeth"],
    "prefix": ["red", "sav", "big", "long", "shadow", "rath"],
    "suffix": ["hand", "son", "hall", "bone", "water", "bow"],
    "first": ['#name#'],
    "last": ['Fletcher', 'Smith', '#prefix.capitalize##suffix#', '#prefix.capitalize##suffix#', '#prefix.capitalize##suffix#', '#prefix.capitalize##suffix#', '#prefix.capitalize##suffix#', '#prefix.capitalize##suffix#', '#prefix.capitalize.s##suffix#'],
});

names.addModifiers(tracery.baseEngModifiers); 

export function updateRelationship(rname, options){
    
}

export function createPerson(props){
    if (!props){
        props = {};
    }

    let name = {
        "first": ((props.male)?names.flatten("#male#"):names.flatten("#female#")),
        "last": ((props.last)?props.last:names.flatten("#last#"))
    };

    let person = {
        id: name.first + "_" + name.last,
        name,
        sex: (props.male)?"male":"female",
        traits: {
            appearance: Traits.getTrait(["player", "appearance"]),
            mind: traits.flatten("#mind#")
        }
    }

    store.dispatch({type:"PERSON_CREATE", person});

    return person;
}