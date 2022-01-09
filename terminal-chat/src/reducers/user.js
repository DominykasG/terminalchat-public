import { SET_NAME_COLOR, SET_NAME, JOIN_ROOM, LEAVE_ROOM} from '../actionTypes/userTypes';
//import { io } from "socket.io-client";

const initialState = 
{
    username: localStorage.getItem('name') || "Anonymous",
    color: localStorage.getItem('color') || "green",
    roomid: "main"
}
export default function user(state = initialState, action) {
    switch (action.type) {
    case SET_NAME:
        localStorage.setItem('name', action.payload);
        return {...state, username: action.payload};
    case SET_NAME_COLOR:
        localStorage.setItem('color', action.payload);
        return {...state, color: action.payload};
    case JOIN_ROOM:
        // socket.emit('connected', action.payload)
        return {...state, roomid: action.payload.roomid};
    case LEAVE_ROOM:
        // socket.emit('disconnected', action.payload)
        return {...state};
    default:
        return state;
  }
}