import { useNavigate } from 'react-router-dom';
import { socket } from '../../App';
import { groupActions } from './add-group-slice';


export const fetchGroupData = () => {
    return async (dispatch) => {
        socket.emit("all_users", true, function (data) {
            try {
                dispatch(groupActions.getUsers(data));
                
            } catch (error) {

            }
        })
    }
}


export const addGroupData = (groupData) => {
    return async (dispatch) => {
        socket?.emit("cr_new",groupData, function (dataFromServer) {
           
              try {
                if(dataFromServer === "ok"){ 
                    console.log(dataFromServer);
                        
                    // const navigate = useNavigate();
                    // navigate('/login');
                }
               
                
            } catch (error) {
                    throw error;
            }
            }
          );
        
    }
}




