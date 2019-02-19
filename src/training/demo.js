import { createStore } from 'redux';
import {status,sort} from './actions/index';
import myReducer from './reducers/index';

const store = createStore(myReducer);
console.log("Default : " + JSON.stringify(store.getState()));


// from action/index
store.dispatch(status());

console.log("Toogle Status : " + JSON.stringify(store.getState()));

store.dispatch(sort({
    by : 'name',
    value : 1
})); 

console.log("Sort : " + JSON.stringify(store.getState()));