import {store} from '../../store';
import * as Helper from '../helper';
import tracery from 'tracery-grammar';

const names = tracery.createGrammar({
    "male": ["Richard", "Allan", "Dave", "Henry", "Max", "Theadore"],
    "female": ["Rose", "Dorothy", "Emma", "Margaret", "Elizabeth"],
    "prefix": ["red", "sav", "big", "long", "shadow", "rath"],
    "suffix": ["hand", "son", "hall", "bone", "water", "bow"],
    "first": ['#name#'],
    "last": ['Fletcher', 'Smith', '#prefix.capitalize##suffix#', '#prefix.capitalize##suffix#', '#prefix.capitalize##suffix#', '#prefix.capitalize##suffix#', '#prefix.capitalize##suffix#', '#prefix.capitalize##suffix#', '#prefix.capitalize.s##suffix#'],
});

const traits = tracery.createGrammar({
    "appearance": ["wirey", "thin", "stout", "strong"],
    "mind": ["clever", "brooding", "angry", "honorable", "kind"]
});

names.addModifiers(tracery.baseEngModifiers); 

export function createPerson(props){
    console.log("PERSON");
    if (!props){
        props = {};
    }

    let name = {
        "first": ((props.male)?names.flatten("#male#"):names.flatten("#male#")),
        "last": ((props.last)?props.last:names.flatten("#last#"))
    };

    let person = {
        id: name.first + "_" + name.last,
        name,
        traits: {
            appearance: traits.flatten("#appearance#"),
            mind: traits.flatten("#mind#")
        }
    }

    store.dispatch({type:"PERSON_CREATE", person});

    return person;
}