import React from 'react'

export default function InputSearch(props) {
    return (
    <div className={props.className}>
        <input 
            type={props.type}
            className={props.style}
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            autoComplete={props.autoComplete}
            onChange={props.onChange}
        />
        <button type={props.type} className={props.style}></button>
    </div>
    )
}
