export default function storyreducer(state={people:[]}, action){
    switch(action.type){
        case "PERSON_CREATE":
            let people = [...state.people, action.person];

            return Object.assign({}, state, {people});
        default:
        return state;
    }
}
