import React, { useState, useEffect, useRef } from 'react';
import { getUserName } from '@/lib/auth';
import { disconnectPrivateMessage, getChatHistory, listenForPrivateMessage, registerOnSocket, sendPrivateMessage } from '@/sockets';

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
    const currentTargetUserId = useRef(targetUserId); // To keep track of targetUserId changes

    // Update the current target user ID whenever it changes
    useEffect(() => {
        currentTargetUserId.current = targetUserId;
    }, [targetUserId]);

    useEffect(() => {
        // Scroll to the latest message when messages change
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        if (userId) {
            registerOnSocket(userId);
        }

        const handleIncomingMessage = ({ from, message }: Message) => {
            console.log(`Target ID: ${currentTargetUserId.current}`, "Incoming message:", { from, message });

            // Only add the message if it's from the current targetUserId
            if (currentTargetUserId.current === from) {
                setMessages((prevMessages) => [...prevMessages, { from, message }]);
            }
        };

        listenForPrivateMessage(handleIncomingMessage);

        return () => {
            disconnectPrivateMessage();
        };
    }, [userId]); // Re-run only when userId changes

    useEffect(() => {
        if (userId && targetUserId) {
            getChatHistory(userId, targetUserId, (history: Message[]) => {
                setMessages(history);
            });
        }
    }, [userId, targetUserId]); // Re-run when userId or targetUserId changes

    const sendMessage = async () => {
        const storedUserId: any = await getUserName();
        if (newMessage.trim() && targetUserId.trim() && storedUserId) {
            sendPrivateMessage({ from: storedUserId, to: targetUserId, message: newMessage });
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
