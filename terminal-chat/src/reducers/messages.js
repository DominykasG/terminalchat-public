import { CLEAR_MESSAGES, GET_MESSAGE, SEND_MESSAGE } from '../actionTypes/messageTypes';
//import { io } from "socket.io-client";

const initialState = 
{
    messages: []
}
export default function messages(state = initialState, action) {
    switch (action.type) {
    case SEND_MESSAGE:
        //socket.emit('sendmessage', action.payload)
        return {...state};
    case CLEAR_MESSAGES:
        return {...state, messages: []};
    case GET_MESSAGE:
        return {...state, messages: [...state.messages, action.payload]};
    default:
        return state;
  }
}