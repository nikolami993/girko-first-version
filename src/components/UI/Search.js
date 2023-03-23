import React, { useState } from 'react'
import Button from './Button'
import Input from './Input'
import styles from "./Search.module.css";

export default function Search(props) {

    return (
            <Input
                type={props.type}
                style={props.style}
                placeholder={props.placeholder}
                autoComplete={props.autoComplete}
                onChange={props.onChange}
            />
    )
}
