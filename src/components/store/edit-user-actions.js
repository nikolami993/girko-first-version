import { socket } from '../../App';
import { fetchGroupData } from './add-group-actions';
import { userActions } from './edit-user-slice';


export const updateUsersData = (userForm) => {
    return async (dispatch) => {
        socket.emit("update_users", { users: userForm }, function (data) {
            try {
                if(data === "ok"){
                    dispatch(userActions.editReset({}));
                    dispatch(fetchGroupData());
                }else{
                    dispatch(userActions.editError(data));
                }
                
            } catch (error) {
                dispatch(userActions.editError(data));
            }
        })
        
    }
}




