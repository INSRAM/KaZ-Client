"use client"

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('https://ka-z-severve-git-master-insrams-projects.vercel.app'
    //     , {
    //     // transports: ['websocket'],
    //     // upgrade: false,
    //     // rejectUnauthorized: false,
    //     withCredentials: true,
    // }
); // Ensure this matches your backend URL

interface Message {
    from: string;
    message: string;
}

interface ChatProps {
    userId: string;
    targetUserId: string;
}

const Chat: React.FC<ChatProps> = ({ userId, targetUserId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (userId) {
            localStorage.setItem('userName', userId);
            socket.emit('register', userId);
        }

        socket.on('private message', ({ from, message }: Message) => {
            setMessages((prevMessages) => [...prevMessages, { from, message }]);
        });

        return () => {
            socket.off('private message');
        };
    }, [userId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        socket.emit('get history', { userId, targetUserId }, (response: Message[]) => {
            setMessages([]);
            response.forEach((message: Message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

        });
    }, [targetUserId]);


    const sendMessage = () => {
        const storedUserId = localStorage.getItem('userName');
        if (newMessage.trim() !== '' && targetUserId.trim() !== '' && storedUserId) {
            socket.emit('private message', { from: storedUserId, to: targetUserId, message: newMessage });
            setMessages((prevMessages) => [...prevMessages, { from: userId, message: newMessage }]);
            setNewMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-4 overflow-auto">
                {messages.map((message, index) => (
                    <div ref={messagesEndRef}
                        key={index}
                        className={`mb-4 p-2 rounded-lg break-words max-w-xs ${message.from === userId ? 'bg-blue-500 text-white float-right clear-both' : 'bg-gray-300 text-black float-left clear-both'}`}
                    >
                        {message.message}
                    </div>
                ))}
            </div>
            <div className="p-4 bg-white shadow-md flex items-center">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg mr-4"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button
                    onClick={sendMessage}
                    className={`p-2 rounded-lg ${newMessage.trim() !== '' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    disabled={newMessage.trim() === ''}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;


