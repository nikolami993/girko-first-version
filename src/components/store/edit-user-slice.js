import {createSlice} from '@reduxjs/toolkit';
import { groupActions } from './add-group-slice';


const userSlice = createSlice({
    name:'user',
    initialState: {
        user: {},
        id: "",
        name: "",
        lastName: "",
        active : false,
        email: "",
        error: ""
    },
    
    reducers:{
        getUser(state, action){
            const {data_id, name, email,last_name,active} = action.payload.user;
            state.user = action.payload.user;
            state.id = data_id;
            state.name = name;
            state.email = email;
            state.lastName = last_name;
            if (active === 1){
                state.active = true;
            }else{
                state.active = false;
            }
        },
        editName(state, action){
            state.name = action.payload;
        },
        editLastName(state, action){
            state.lastName = action.payload;

        },
        editEmail(state, action){
            state.email = action.payload;
        },
        editStatus(state, action){
            console.log("edit-user-slice status",action.payload);

            state.active = action.payload;
        },
        editReset(state,action){
            state.user = action.payload;
        },
        
        editError(state, action){
            state.error = action.payload;
        }

    }
})

export const userActions = userSlice.actions;

export default userSlice;
