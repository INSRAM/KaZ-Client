
"use client"
import React, { useState, useEffect } from 'react';
import Chat from '@/components/Chat';
import UsersList from '@/components/UsersList';
const Home: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>(''); // Replace with actual current user ID

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
  };

  // Fetch user name from localStorage on component mount
  useEffect(() => {
    const userName: any = localStorage.getItem('userName');
    setCurrentUserId(userName); // Set default if no userName found
  }, []);


  return (
    <div className="flex h-screen">
      {currentUserId && <UsersList currentUserId={currentUserId} onUserSelect={handleUserSelect} />}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <Chat userId={currentUserId} targetUserId={selectedUser} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p>Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

