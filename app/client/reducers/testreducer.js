export default function testreducer(state={results:[]}, action){
    switch(action.type){
        case "TEST_RUN":
            let results = [...state.results, action.result];
            return Object.assign({}, state, {results});
        default:
        return state;
    }
}
