import {CLEAR_MESSAGES, SEND_MESSAGE, GET_MESSAGE} from '../actionTypes/messageTypes';

export function clearMessages(){
    return {
        type: CLEAR_MESSAGES
    }
}

export function sendMessage(message){
    return {
        type: SEND_MESSAGE,
        payload: message 
    }
}
export function getMessage(message){
    return{
        type: GET_MESSAGE,
        payload: message 
    }
}