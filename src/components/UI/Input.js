import React from 'react'

export default function Input(props) {
    return (
        <input 
            type={props.type}
            className={props.style}
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            autoComplete={props.autoComplete}
            onChange={props.onChange}
            value={props.value}
        />
    )
}
