"use client";

import { backEndURL } from '@/lib/constant';
import io from 'socket.io-client';
const socket = io(backEndURL, {
    withCredentials: true,
    transports: ['websocket', 'polling'], // Ensure both websocket and polling transports are allowed
});


interface Message {
    from: string;
    message: string;
}

interface PrivateMessage {
    from: string,
    to: string,
    message: string
}

const registerOnSocket = (userId: string) => {
    socket.emit('register', userId);
}

const sendPrivateMessage = (message: PrivateMessage) => {
    socket.emit('private message', message);
}


const listenForPrivateMessage = (callback: (message: Message) => void) => {
    socket.on('private message', (message: Message) => {
        callback(message);
    });
}

const getChatHistory = (userId: string, targetUserId: string, callback: (messages: Message[]) => void) => {
    socket.emit('get history', { userId, targetUserId }, (response: Message[]) => {
        callback(response);
    });
}

// Clean up socket listeners when not needed
const disconnect = () => {
    socket.disconnect();
}

const disconnectPrivateMessage = () => {
    socket.off('private message');
}

export {
    registerOnSocket,
    sendPrivateMessage,
    listenForPrivateMessage,
    disconnect,
    disconnectPrivateMessage,
    getChatHistory
}