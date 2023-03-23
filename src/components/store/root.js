import { combineReducers } from "redux";
import { legacy_createStore as createStore } from 'redux';
import groupReducer from './add-group-slice';
import userReducer from './edit-user-slice';

// const currentState = store.getState();

const rootReducer = combineReducers({
    user: userReducer,
    group: groupReducer
  });

const root = createStore(rootReducer);



export default root;