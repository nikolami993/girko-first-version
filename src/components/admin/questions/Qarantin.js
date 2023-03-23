import React, { useRef, useState } from 'react'

const Qarantin = ({ socket }) => {
    const [serviceList, setServiceList] = useState([{ service: '' }]);//ok
    const addHandler = () => {
        setServiceList([...serviceList, { service: '' }]);//ok
    }
    const removeHandler = (index) => {//ok
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
    }
    const changeHandler = (e, index) => {
        const { name, value } = e.target;//gadja name koji vec postoji i value koji se trenutno upisuje 
        const list = [...serviceList];//select sve iz liste 
        list[index][name] = value;//nadje element sa tim nazivom pod tim indeksom tek tad mu dodeli value
        setServiceList(list);//ide u state ara
    }

    return (
        <div>
            {serviceList.map((serviceLis, index) => {
                return (
                    <div>
                        <input type="text"
                            name="service"
                            id="service"
                            required
                            value={serviceLis.service} 
                            onChange={(e) => changeHandler(e, index)} 
                            />
                        <button onClick={() => removeHandler(index)}>Otkazi</button>
                        <button onClick={addHandler}>Dodaj</button>
                    </div>
                )
            })}
        </div>
    )
}
export default Qarantin;