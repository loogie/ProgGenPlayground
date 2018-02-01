import {call, put, takeEvery} from 'redux-saga/effects';
import * as Tools from '../apis/tools';
import * as Story from '../apis/story';
import {store} from '../store';

// main Map saga generators
export default function* toolsaga() {
    yield takeEvery("TOOL_ACTION", toolAction);
    yield takeEvery("STORY_ACTION", storyAction);
}

function* toolAction(action){
    try{
        yield call(Tools.performAction, action);
    }
    catch(ex){
        yield put({type: "ERROR", error: ex, from: action.type});
    }
}

function* storyAction(action){
    try{
        yield call(Story.performAction, action);
    }
    catch(ex){
        yield put({type: "ERROR", error: ex, from: action.type});
    }
}