import React, { useEffect, useState } from 'react'
import Button from '../../UI/Button';
import ButtonClose from '../../UI/ButtonClose';
import CheckUserIds from '../../UI/CheckUserIds';
import Input from '../../UI/Input';
import UsersList from '../../users/UsersList';
import Header from '../boxes/Header';
import styles from './AddUserGroup.module.css';
import GIRLogo from './../../../img/logo.png'
import { addGroupData, fetchGroupData } from '../../store/add-group-actions';
import { useDispatch, useSelector } from 'react-redux';
import { groupActions } from '../../store/add-group-slice';
import { Navigate, useNavigate } from 'react-router-dom';
const AddUserGroup = () => {

    const [query, setQuery] = useState("");
    const [show2, setShow2] = useState("");
    const navigate = useNavigate();
    const usersData = useSelector((state) => state.group.userChecked);
    const group = useSelector((state) => state.group.nameGroup);
    const dispatch = useDispatch();

    const addGroupNameHandler = (e) => {
        console.log(e.target.value);
        dispatch(groupActions.editGroupName(e.target.value));
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const groupData = {
            users: usersData, name: group 
        };
        console.log("groupData", groupData);
        let result = dispatch(addGroupData(groupData));
        result.then(()=>{
            console.log("test");
            navigate('/xxx');
        })

       
    }
    const checkHandler = (e) => {
        setQuery("");
    }
    return (
        <form onSubmit={submitHandler}>
        
            <Header
                style={styles.titleofForm}
                title="Korisnici"
                imageStyle={styles.log}
                image={GIRLogo}
            />
            <Input
                type="text"
                style={styles.searchUsers}
                id="grupa"
                name="grupa"
                placeholder="Unesite naziv grupe..."
                autoComplete="off"
                onChange={addGroupNameHandler}
            />
            <CheckUserIds />
            <Input
                type="search"
                style={styles.searchUsers}
                id="pretraga"
                name="pretraga"
                placeholder="Unesite pretragu..."
                autoComplete="off"
                onChange={(e) => (setQuery(e.target.value) || e.target.value.length >= 3 ? setShow2(true) : setShow2(false))}
            />
            <ButtonClose query={query} onAddCheck={checkHandler} />

            <div className={styles.boxforUsers}>
                <UsersList criteria={query}  />
            </div>
            <Button
                style={styles['btn-addpost']}
                type="submit"
                title="Kreiraj grupu"
            />
        </form>
    )
}

export default AddUserGroup;