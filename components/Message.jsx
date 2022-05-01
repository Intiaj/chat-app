import React from 'react'

function Message({sender, text, current}) {
  return (
      <div className={current === sender ? 'text-xl flex flex-row-reverse' : 'text-xl'}>
          <p>{text}</p>
      </div>
  )
}

export default Message