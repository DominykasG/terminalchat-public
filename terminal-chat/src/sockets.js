// import {io} from 'socket.io-client'
// import {useDispatch} from 'react-redux'
// import React, {useEffect}from 'react'
// import { getMessage} from './actions/message';

// const socket = io.connect('http://localhost:4000')


// export default function Sockets() {
//     const dispatch = useDispatch()
//     // useEffect(() => {
//     //     socket.on('receivedmessage', ({username, message}) =>{
//     //         dispatch(getMessage({username: username, message: message}))
//     //         console.log('gavau')
//     //     })
//     // }) 
//     socket.on('receivedmessage', ({username, message}) =>{
//         dispatch(getMessage({username: username, message: message}))
//         console.log('gavau')
//     })
//     return (
//         <>
            
//         </>
//     )
// }

// export function SocketSendMessage(data){
//     socket.emit('sendmessage', data)
// }