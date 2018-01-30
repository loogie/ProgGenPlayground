import {call, put, takeEvery, fork} from 'redux-saga/effects';
import {store} from '../store';

// main Map saga generators
export default function* globalsaga() {
    yield takeEvery("CLICK", click);
}

function* click(action){
    try{
        let state = store.getState();

        switch(state.tool.active){
            case "tetris":
                yield put({type:"TOOL_ACTION", action});
                break;
        }
    }
    catch(ex){
        yield put({type: "ERROR", error: ex, from: action.type});
    }
}