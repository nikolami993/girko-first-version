import React, { useEffect, useState } from 'react'

export default function Chat({socket}) {
    const [grupa,setGrupa] = useState("");
    const [datum,setDatum] = useState("");
    
    const [podaci,setPodaci] = useState([]);

    useEffect(() => {
      
        socket?.emit("test", {a:true }, function (dataFromServer) {
            console.log(dataFromServer);
        });
      
    }, [])
    
    const submitHandler = (event) => {

        event.preventDefault();


        if (grupa.length > 0) {
            const userData = {
                p_name:grupa,
                p_msg_exp_date: datum,
            };
            console.log(userData);
            


        } else if (grupa.length === 0) {
            console.log(1);
        }
    }
    return (
    <div>
        <input type="text" onChange={setGrupa} />
        <input type="text" onChange={setDatum} />
        <input type="submit" value="Posalji" onSubmit={submitHandler}  />
    </div>
  )
}
