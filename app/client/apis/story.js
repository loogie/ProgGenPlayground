import {store} from '../store';
import * as Helper from './helper';
import * as Person from './story/people';


export function* performAction(action){
    switch (action.value){
        case 'create_person' :
            Person.createPerson();
            break;
        case 'create_place' :
            break;
    }
}