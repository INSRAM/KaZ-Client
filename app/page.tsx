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
      const userName: any = await getUserName();
      setCurrentUserId(userName);
    };
    fetchUserName();
  }, []);

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
  };

  return (
    <div className="flex h-screen">
      <UsersList onUserSelect={handleUserSelect} />
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <Chat userId={currentUserId} targetUserId={selectedUser} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p>Welcome to KaZ 😎</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

