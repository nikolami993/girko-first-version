import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button';
import styles from '../groups/DropdownGroup.module.css';
// import "./SearchableDropdown.css";
function DropdownGroup(props) {
    const { socket} = props;
    const [query2, setQuery2] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [users2, setUsers2] = useState([]);
    const [value, setValue] = useState("");
    const inputRef = useRef(null);
    const [arrayUsers, setArrayUsers] = useState([
        { data_id: "", name: "",last_name:"", status: "" },
    ]);
    const selectOption = (option) => {
        console.log("option.name");
        console.log(option.name);
        if(option.last_name != null){

            inputRef.current.value = option.name+" "+option.last_name;
        }else{
            inputRef.current.value = option.name;

        }
        setIsOpen((isOpen) => !isOpen);
    };

    function toggle(e) {
        setIsOpen(e && e.target === inputRef.current);
    }

    const filter = (options) => {
        return options.filter(
            (option) => option["name"].toLowerCase().indexOf(query2.toLowerCase()) > -1
        );
    };
    const inputChangeNameUserHandler = (e) => {
        if (e.target.value.length > 2) {
            socket?.emit(
                "get_user_for_name",
                { name: e.target.value },
                function (dataFromServer) {
                    console.log(dataFromServer);
                    setUsers2(dataFromServer);
                }
            );
        }
    };

    const addHandler = (e) => {
        e.preventDefault();

        const selectedEmployeeId = users2.find(
            (user) => user.name === inputRef.current.value
        );
        const selectedEmployeeId2 = users2.find(
            (user) => user.name +" "+user.last_name === inputRef.current.value
        );


        console.log("selectedEmployeeId");
        console.log(selectedEmployeeId);

        console.log("selectedEmployeeId2");
        console.log(selectedEmployeeId2);
        

       
        if (selectedEmployeeId2 != null) {
            
            let nameUser = inputRef.current.value;

            console.log(selectedEmployeeId2.data_id);
            console.log(inputRef.current.value);

            if (selectedEmployeeId2.data_id.length > 0 && inputRef.current.value.length > 0 ) {
                let addUser = { data_id: selectedEmployeeId2.data_id, name: selectedEmployeeId2.name, last_name: selectedEmployeeId2.last_name , status: "I" };
                console.log(addUser);

                setArrayUsers([
                    ...arrayUsers,
                     addUser,
                ]);
                props.onAddUser(addUser);
                inputRef.current.value = "";
                setUsers2([]);
            }
        }
        if (selectedEmployeeId != null) {
            
            let nameUser = inputRef.current.value;

            console.log(selectedEmployeeId.data_id);
            console.log(inputRef.current.value);

            if (selectedEmployeeId.data_id.length > 0 && inputRef.current.value.length > 0 ) {
                let addUser = { data_id: selectedEmployeeId.data_id, name: selectedEmployeeId.name, last_name: selectedEmployeeId.last_name , status: "I" };
                console.log(addUser);

                setArrayUsers([
                    ...arrayUsers,
                     addUser,
                ]);
                props.onAddUser(addUser);
                inputRef.current.value = "";
                setUsers2([]);
            }
        }
    };
 
  return (
    <div className={styles.responses}>
        {/*  pocetak Dropdown Input komponenta */}
        <div className={styles.dropdown}>
            <div className={styles.control}>
                <div className={styles["selected-value"]}>
                    
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Dodaj korisnika"
                        onChange={(e) => {inputChangeNameUserHandler(e)}}
                        onClick={toggle}
                    />
                </div>
                <div className={`${styles.arrow} ${isOpen ? styles.open : ""}`}></div>
            </div>

            <div className={`${styles.options} ${isOpen ? styles.open : ""}`}>
                {filter(users2).map((option, index) => {
                    return (
                        <div
                            onClick={() => selectOption(option)}
                            className={`${styles.option} ${option["name"] === value ? styles.selected : ""}`}
                            key={`${"id"}-${index}`}
                        >
                            {option["last_name"] ? option["name"] +" "+ option["last_name"] : option["name"]}
                        </div>
                    );
                })}
            </div>
        </div>
        {/*  kraj dropdown Input komponenta */}
            
        {/*  pocetak button + komponenta */}
        <button type="button"  className={styles.plus}   onClick={addHandler}>+</button>
        {/*  kraj button + komponenta */}

    </div>
  )
}

export default DropdownGroup;