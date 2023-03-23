import React, { useEffect, useState } from 'react'
import styles from '../../admin/checkedUsers/CheckedListUsers.module.css'
function CheckedListUsers(props) {
    const { setCheckedUsersIds, checkedUsersIds, checkedUsers, users, setServerData, serverData } = props;
    const [datas, setDatas] = useState([]);
    const unCheckedHandler = (e) => {
        e.preventDefault();
        let checked_array = [];
        let unCheckedUserId = {
            id: e.target.id,
            name: e.target.name
        }

        checked_array = users.filter((user) => user.data_id.includes(unCheckedUserId.id));
        props.onRemoveCheckedItems(checked_array,unCheckedUserId);
    }
    useEffect(() => {
        let checkList = filterObjectArray(users, checkedUsers);
        setDatas(checkList);
    }, [checkedUsers]);

    const filterObjectArray = (arr, filterArr) => {
        return arr.filter(el => filterArr.some(f => f === el.data_id))
    }
    return (
        <div>
            {datas.length > 0 &&
                <div className={styles.previewCheckUsers}>
                    {
                        datas.map((data) => (
                            <button onClick={unCheckedHandler} key={data.data_id} name={data.name} id={data.data_id} className={styles.border}>
                                {data.last_name ? " X " + data.name + " " + data.last_name + " " : " X " + data.name}
                            </button>
                        ))
                    }
                </div>
            }

        </div>
    )
}

export default CheckedListUsers