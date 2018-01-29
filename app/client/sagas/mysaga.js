import {call, put, takeEvery} from 'redux-saga/effects';

// main Map saga generators
export default function* mysagas() {
  //yield takeEvery("ACTION", actionFunction);
}

function* actionFunction(action){
    try{
        //yield call(ActionApi.function, action);
    }
    catch(ex){
        yield put({type: "ERROR", error: ex, from: action.type});
    }
}