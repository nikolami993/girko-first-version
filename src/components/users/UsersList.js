import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../App';
import { fetchGroupData } from '../store/add-group-actions';
import { groupActions } from '../store/add-group-slice';
import UserItem from './UserItem'
import styles from './UserItem.module.css';
function UsersList(props) {
    const { criteria } = props;
    const usersData = useSelector((state)=>state.group.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchGroupData());
    }, [dispatch]);
    return (
        <div className={styles.boxforusers}>
            {usersData?.filter((user) => user.name.toLowerCase().includes(criteria.toLowerCase()) || user.last_name.toLowerCase().includes(criteria.toLowerCase()) ).map((user) => (
                <UserItem key={user.data_id} user={user}/>
            ))}
        </div>
    )
}

export default UsersList;