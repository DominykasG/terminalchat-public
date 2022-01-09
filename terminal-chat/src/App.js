import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect} from 'react';
import {io} from 'socket.io-client';
import ChatWindow from './componenets/ChatWindow';
import InputField from './componenets/InputField';
import {useDispatch, useSelector} from 'react-redux';
import { getMessage} from './actions/message';
import {joinRoom} from './actions/user';

const socket = io('http://localhost:4000', {forceNew: false})

function App() {
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.username)
  useEffect(() => {
    socket.on('connect', () =>{
      socket.emit('connected', {roomid: "main", username: username})
      dispatch(joinRoom({roomid: "main", username: username}));
    })
    socket.on('receivedmessage', ({username, message, color, roomid}) =>{
      console.log("message received", message)
      dispatch(getMessage({username: username, message: message, color: color, roomid: roomid}))
    })
    socket.on('userconnected', ({username, roomid}) =>{
      dispatch(getMessage({message: username + " has joined " + roomid}))
    })
    socket.on('userdisconnected', ({username, roomid}) =>{
      dispatch(getMessage({message: username + " has left " + roomid}))
    })
    socket.on('whoareyou', (currentroomid) =>{
      socket.emit('sendusername', {username, currentroomid})
    })
    socket.on('who', ({users, currentroomid}) =>
      //console.log(currentroomid)
      dispatch(getMessage({message: "Users in " + currentroomid + ": " + users}))
    )
  })

  return (
    <>
      <div className="container-fluid h-100 d-flex flex-column px-0">
        <ChatWindow></ChatWindow>
        <div className="row flex-shrink-1">
          <div className="col-12">
            <InputField socket={socket}></InputField>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
