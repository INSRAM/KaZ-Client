"use client";
import React, { useState, useEffect } from 'react';
import Chat from '@/components/Chat';
import UsersList from '@/components/UsersList';
import { getUserName } from '@/lib/auth';

const Home: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('');

  useEffect(() => {
    const fetchUserName = async () => {
      console.log("Fetching user name");
      const userName: any = await getUserName();
      setCurrentUserId(userName);
    };
    fetchUserName();
  }, []);

  const handleUserSelect = (userId: string) => {
    console.log("User selected:", userId);
    setSelectedUser(userId);
  };

  console.log("Home component rendered");

  return (
    <div className="flex h-screen">
      {currentUserId && (
        <UsersList currentUserId={currentUserId} onUserSelect={handleUserSelect} />
      )}
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

