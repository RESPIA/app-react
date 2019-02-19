var initialState = false;

const myReducer = (state = initialState, action) => {
    if(action.type === "TOGGLE_STATUS")
    {
        return !state;
    }
   
}

export default myReducer;