import { configureStore} from '@reduxjs/toolkit';


import groupReducer from './add-group-slice';
import userReducer from './edit-user-slice';

const store = configureStore({
    reducer:{group:groupReducer.reducer, user: userReducer.reducer}
});


  
export default store;