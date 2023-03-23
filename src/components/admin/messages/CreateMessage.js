import React, { useEffect, useState } from 'react'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import Textarea from '../../UI/Textarea'
import Header from '../boxes/Header'
import FormList from '../form/FormList'
import styles from '../messages/CreateMessage.module.css';
import { useNavigate } from 'react-router-dom';
import ButtonClose from '../../UI/ButtonClose'
import CheckedListUsers from '../checkedUsers/CheckedListUsers'

export default function CreateMessage({ socket }) {
    const [checkedUsersIds, setCheckedUsersIds] = useState([]);

    const [msg, setMsg] = useState("");
    const [users, setUsers] = useState([]);
    const [serverData, setServerData] = useState([]);
    const [query, setQuery] = useState("");
    const [mailman, setMailman] = useState("");
    const [unChecked, setUnChecked] = useState("");
    let navigate = useNavigate();
    const [show2, setShow2] = useState(false);

    const readMsgHandler = message => {
        
        setMsg(message);
    }
    useEffect(() => {
        console.log("MESSAGE");
        console.log(msg);
    }, [msg])
    
    const readCheckedItemsHandler = data => {
        setServerData(data);
    }
    const unCheckedItemsHandler = (data,unCheckedUser) => {
        console.log("unCheckedItemsHandler");
        let unChecked = [...serverData];
        console.log(data);

        let id = data[0].data_id;
        let array = unChecked.filter(check => check != id);
        console.log("array remains checked");
        console.log(array);
        setServerData(array);
        // setCheckedUsersIds(array);
        setUnChecked(unCheckedUser);

    }

    const checkHandler=(e)=>{
        setQuery("");
        setShow2(false);
    }

   
    useEffect(() => {
        socket?.emit("all_all_users", { admin: window.name }, function (dataFromServer) {
            setMailman(window.name);
            setUsers(dataFromServer);
        })
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();
        const addForm = {
            to_users: serverData, 
            msg, 
            from_user: mailman
        }
        

        
        if (msg.length > 0) {
            console.log("addForm");
        console.log(addForm);
            socket?.emit("cr_msg", addForm, function (data) {
                if(data != "no results" || data != "nok"){
                    console.log(data); 
                    navigate('/poruke');
                }
                
            });
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <Header
                style={styles.titleAddPost}
                title="Pošalji poruku" 
            />
            <CheckedListUsers users={users} 
             onRemoveCheckedItems={unCheckedItemsHandler} 
             setCheckedUsersIds={setCheckedUsersIds}
             checkedUsersIds={checkedUsersIds}
             checkedUsers={serverData}
             />
            <Input
                type="text"
                style={styles.searchUsers}
                id="grupa"
                name="grupa"
                placeholder="Unesite pretragu..."
                autoComplete="off"
                onChange={(e) => setQuery(e.target.value)}
            />
            <ButtonClose query={query} onAddCheck={checkHandler}/>
            <FormList
                criteria={query}
                users={users}
                unCheckedUsersEvent={unChecked}
                serverData={serverData}
                setServerData={setServerData}
                checkedUsers={serverData}
                onCheckedItems={readCheckedItemsHandler}
                setCheckedUsersIds={setCheckedUsersIds}
                checkedUsersIds={checkedUsersIds}
               
            />
            <Textarea
                style={styles['input-box-txt']}
                // style={styles.searchUsers}
                placeholder="Unesite poruku..."
                addMessage={readMsgHandler}
            />
            <Button
                style={styles['btn-addpost']}
                type="submit"
                title="Pošalji"
            />
        </form>
    )
}
