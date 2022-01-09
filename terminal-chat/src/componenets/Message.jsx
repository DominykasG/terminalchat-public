import React from 'react'

export default function Message(props) {
    const message = props.message;
    return (
        <div className="d-flex flex-wrap">   
            <div className="text-break">
                <span className="mr-1" style={{color: message.color}} >
                    {message.username?"<"+message.username+">":""}
                </span>
                {message.message}
            </div>    
        </div>
    )
}
