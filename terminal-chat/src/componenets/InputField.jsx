import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {clearMessages, getMessage} from '../actions/message';
import {joinRoom, setName, setNameColor } from '../actions/user';
import {useSelector} from 'react-redux';

export default function InputField(props) {
    const username = useSelector(state => state.user.username)
    const color = useSelector(state => state.user.color)
    const currentroomid = useSelector(state => state.user.roomid)
    
    const socket = props.socket;
    const [text, setText] = useState("")
    const dispatch = useDispatch()

    function handleText(input)
    {
        setText(input.target.value)
    }
    function checkField()
    {
        if(text.startsWith("/"))
        {
            if(text === "/help")
            {
                dispatch(getMessage({message: "Type /setusername [YOURUSERNAME] to set your username"}))
                dispatch(getMessage({message: "Type /setcolor [COLOR] to set your username color"}))
                dispatch(getMessage({message: "Type /join [ROOMID] to join a chatroom"}))
                dispatch(getMessage({message: "Type /disconnect from a chatroom"}))
                dispatch(getMessage({message: "Type /who to find users in your chatroom"}))
                dispatch(getMessage({message: "Type /where to find your current chatroom"}))
                dispatch(getMessage({message: "Type cls or clear to clear screen"}))
            }
            else if(text.startsWith("/setusername "))
            {
                let username = text;
                username = username.replace("/setusername ", "");
                if(username === "" || username === undefined)
                {
                    dispatch(getMessage({message: "Username cannot bet empty"}));
                }
                else
                {
                    dispatch(setName(username));
                }   
            }
            else if(text.startsWith("/setcolor "))
            {
                let color = text;
                color = color.replace("/setcolor ", "");
                dispatch(setNameColor(color));
                
            }
            else if(text.startsWith("/join "))
            {
                let roomid = text;
                roomid = roomid.replace("/join ", "");
                socket.emit('connected', {roomid, username, currentroomid})
                dispatch(clearMessages())
                dispatch(joinRoom({roomid, username}));
            }
            else if(text === "/disconnect")
            {
                let roomid = username + "#" + Math.random().toString(36).substring(7);
                socket.emit('disconnected', {username, roomid, currentroomid})
                dispatch(clearMessages())
                dispatch(joinRoom({roomid, username}));
            }
            else if(text === "/who")
            {
                socket.emit('who', {currentroomid})
            }
            else if(text === "/where")
            {
                dispatch(getMessage({message: "Your current room is: " + currentroomid}))
            }
            else
            {
                dispatch(getMessage({message: "Type /help for more commands"}))
            }
        } 
        else
        {
            if(text !== "")
            {
                if(text === "cls" || text === "clear")
                {
                    dispatch(clearMessages())
                }
                else
                {
                    //dispatch(sendMessage({message: text, username: username, color: color, roomid: roomid}))
                    socket.emit('sendmessage', {message: text, username: username, color: color, roomid: currentroomid})
                }
            }
        }
        setText("")
    }
    return (
        <div>
            <form onSubmit={(e) =>{e.preventDefault(); checkField(text)}}>
                <div className="d-inline-flex w-100">
                    <div className="input-tag mr-1 ">{"<"}{username}{">"}</div>
                    <input type="text" className="input-block-level rounded-0" placeholder="type text here or type /help for more commands" value={text} onChange={(e) => handleText(e)}></input>
                </div>
            </form>
        </div>
    )
}
