import React from 'react'

export default function Textarea(props) {

  const inputChangeMsgHandler = (event) => {
    props.addMessage(event.target.value);
  }
  return (
    <textarea className={props.style} placeholder={props.placeholder} onChange={inputChangeMsgHandler}></textarea>
    )
}
