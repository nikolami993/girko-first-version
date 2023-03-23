
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../../navbar/Sidebar.js";
import LayoutBox from "../boxes/LayoutBox";
import EditGroupForm from "./EditGroupForm.js";
import GroupForm from "./GroupForm";

const Group = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [editUsers, setEditUsers] = useState("");
  const [groupEdit, setGroupEdit] = useState({id:"",name:"",last_name:""});
  const [check, setCheck] = useState(false);

  const readCookie = () => {
  const user = Cookies.get("user");
  if (!user) {
      Navigate("/");
  }
  };

useEffect(() => {
    readCookie();
    populateGroup();
}, []);

const populateGroup = () => {
    socket?.emit(
        "all_groups",
        true,
        function (dataFromServer) {
            console.log("SJM");
            console.log(dataFromServer);
            setUsers(dataFromServer);
        }
    );
};
const editFormHandler = (data,group,check) => {
  setEditUsers(data);
  let groupName = users.filter(user => user.data_id === group);
  // console.log(groupName);
  setGroupEdit(groupName);
  setCheck(check);
}
const addUserHandler = (data) => {
  setEditUsers([...editUsers,data]);
}
const reloadHandler = (data) => {
  if (!data){
    setCheck(false);
  }
}
  return (
    <Sidebar>
      <LayoutBox>
        {!check && <GroupForm socket={socket} users={users} onRefresh={populateGroup} onEditForm={editFormHandler} />}
        {check  && <EditGroupForm socket={socket} usersEdit={editUsers} editGroupName={groupEdit} onSubmitForm={reloadHandler} onAddUserGroup={addUserHandler} />}
      </LayoutBox>
    </Sidebar>
  );
};
export default Group;
