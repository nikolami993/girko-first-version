import React from 'react'

export default function Button(props) {
  return (
    <button className={props.style} id={props.id} type={props.type}>{props.title}</button>
  )
}
