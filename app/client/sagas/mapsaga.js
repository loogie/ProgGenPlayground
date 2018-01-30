import {call, put, takeEvery, fork} from 'redux-saga/effects';
import {store} from '../store';

// main Map saga generators
export default function* mapsaga() {
    yield takeEvery("MAP_MOUSE_CLICK", mapClick);
}

function* mapClick(action){
    try{
        let state = store.getState();

        yield put({type:"CLICK", from:"MAP", event: action.event});
    }
    catch(ex){
        yield put({type: "ERROR", error: ex, from: action.type});
    }
}