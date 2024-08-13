import React, { useState, useEffect } from 'react';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import UserSearch from './UserSearch';
import { apiUsers } from '@/app/api';
import { getUserName } from '../lib/auth';
import Loading from '../loading';

interface User {
    user: {
        _id: string;
        userName: string;
    };
    latestMessage: string;
    timestamp: Date;
}

interface UsersListProps {
    onUserSelect: (userId: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({ onUserSelect }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [activeUser, setActiveUser] = useState<string | null>(null);
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const currentUserId: string = await getUserName();
                const response = await apiUsers.myUsers(currentUserId);
                setUsers(response.user);
            } catch (err: any) {
                console.error('Failed to fetch users:', err);
                throw err
            } finally {
                setLoading(false);
            }
        };

        if (!isSearchActive) {
            setLoading(true);
            fetchUsers();
        }
    }, [isSearchActive]);

    const handleUserSelect = (userName: string) => {
        setActiveUser(userName);
        onUserSelect(userName);
    };

    const handleSearchClick = () => {
        setIsSearchActive(true);
    };

    const handleBackToChats = () => {
        setIsSearchActive(false);
    };

    return (
        <div className="w-1/4 bg-gray-100 p-2 overflow-y-auto relative">
            {loading ? (
                <Loading />
            ) : isSearchActive ? (
                <div>
                    <button
                        onClick={handleBackToChats}
                        className="text-blue-500 hover:text-blue-700 float-left mb-3"
                    >
                        <FaArrowLeft />
                    </button>
                    <UserSearch onUserSelect={handleUserSelect} />
                </div>
            ) : (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xs font-normal">My <b className='text-blue-700'>KaZ</b> Chats</h2>
                        <button
                            onClick={handleSearchClick}
                            className="text-blue-500 hover:text-blue-700 float-right"
                        >
                            <FaSearch />
                        </button>
                    </div>
                    <ul className="overflow-y-auto">
                        {users.map((user_) => (
                            <li
                                key={user_.user.userName}
                                className={`p-2 cursor-pointer rounded-lg my-2 ${activeUser === user_.user.userName
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 hover:bg-gray-400'
                                    }`}
                                onClick={() => handleUserSelect(user_.user.userName)}
                            >
                                <p className="flex flex-col">
                                    <span className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                                        {user_.user.userName}
                                    </span>
                                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                                        {user_.latestMessage}
                                    </span>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UsersList;
