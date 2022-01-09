import React from 'react'
import {useSelector} from 'react-redux'
import Message from './Message';

export default function ChatWindow(props) {
    const messages = useSelector(state => state.messages.messages)

    return (
        <div id="messages" className="row h-100 chat-window mx-0 d-flex w-100" style={{overflowY: "scroll"}}>
          <div className="col-12 text-light align-self-end ">
              {messages?.map((message, index) =><Message message={message} key={index}></Message>)}             
          </div>
        </div>
    )
}