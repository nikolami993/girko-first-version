import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../navbar/Sidebar';
import Cookies from 'js-cookie';
import CreateMessage from '../messages/CreateMessage';
import LayoutBox from '../boxes/LayoutBox';
import BackdropGroup from '../groups/BackdropGroup';
import Spinner from '../../UI/Spinner';

export default function AddPost({ socket }) {
    //add message to users
    //search users from users list
    //redirect and show created posts
    let navigate = useNavigate();
    const [message, setMessage] = useState("");
    // const [modalIsOpen, setModalIsOpen] = useState(false);
    // const [loading, setLoading] = useState(false);

    const readCookie = () => {
        const user = Cookies.get("user");
        if (user.length < 30) {
            navigate('/');
        }
    }

    // const modalFormHandler = () => {
    //     setModalIsOpen(false);
    // }
    // const approvedFormHandler = (approve) => {
    //     setModalIsOpen(false);

    // }

    useEffect(() => {
        // socket.on("message", (data) =>{
        //     alert(data.message);
        // });
        // setLoading(true);

        socket.on("connect_error", (err) => {
            // setLoading(false);
            // setModalIsOpen(true);
            console.log(`connect_error due to ${err.message}`);
            // console.log(`connect_error due to`);
        });
        // setModalIsOpen(false);
        // setTimeout(() => {
        //     setLoading(false);
        //   }, 1000);

        //    console.log("dataFromServer");
        //    console.log(dataFromServer);
        //      if(dataFromServer.length > 0){
        //         readCookie();
        //         // navigate("/poruke");
        //      }else{
        //         Cookies.remove('user');
        //         navigate('/');
        //      }
        //   });

    }, []);

    return (
        <Sidebar>
            {/* {loading && <Spinner />} */}
            {/* {!loading && modalIsOpen && */}
                {/* <BackdropGroup
                    onConfirm={modalFormHandler}
                    onApprove={approvedFormHandler}
                    check={false}
                    title="Greška sa serverom trenutno niste na mreži"
                /> */}
                {/* } */}
            {/* {!loading && !modalIsOpen && */}
                {/* ( */}
                    <LayoutBox>
                        <CreateMessage socket={socket} />
                    </LayoutBox>
                {/* ) */}
            {/* } */}

        </Sidebar>
    )

}



