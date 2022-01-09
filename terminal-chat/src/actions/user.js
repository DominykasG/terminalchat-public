import {JOIN_ROOM, SET_NAME, SET_NAME_COLOR, LEAVE_ROOM} from '../actionTypes/userTypes';

export function setName(name)
{
    return {
        type: SET_NAME,
        payload: name
    };
}
export function setNameColor(color)
{
    return{
        type: SET_NAME_COLOR,
        payload: color
    }
}
export function joinRoom(roomid)
{
    return{
        type: JOIN_ROOM,
        payload: roomid
    }
}
export function leaveRoom()
{
    return{
        type: LEAVE_ROOM
    }
}