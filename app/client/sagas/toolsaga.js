import {call, put, takeEvery} from 'redux-saga/effects';
import * as Tools from '../apis/tools';
import {store} from '../store';

// main Map saga generators
export default function* toolsaga() {
    yield takeEvery("TOOL_ACTION", toolAction)
}

function* toolAction(action){
    try{
        yield call(Tools.performAction, action);
    }
    catch(ex){
        yield put({type: "ERROR", error: ex, from: action.type});
    }
}