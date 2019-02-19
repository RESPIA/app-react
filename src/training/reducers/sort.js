const myReducerInitialState = {
    sort : {
        by : 'name',
        value : -1
    }
}
const myReducer = (state = myReducerInitialState, action) => {
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

