import React, { useEffect } from 'react'

export default function MessageQuestionnaire({msg}) {
useEffect(() => {
    console.log(1);
}, [msg])

  return (
    <div><b>{msg}</b></div>
  )
}
