const myReducerInitialState = {
    status : false,
    sort : {
        by : 'name',
        value : -1
    }
}
const myReducer = (state = myReducerInitialState, action) => {
    if(action.type === "TOGGLE_STATUS")
    {
        state.status = !state.status;
        state.sort = {
            by : 'stt',
            value : -1
        };
        return state;
    }
    if(action.type === "SORT")
    {
        state.sort = {
            by : action.sort.by,
            value : action.sort.value
        }
        return state;
    }
    return state;
}

export default myReducer;

// import status from './status';
// import sort from './sort';
// import { combineReducers } from 'redux';

// const myReducer = combineReducers({
//     status : status,
//     sort : sort
// });

// export default myReducer;