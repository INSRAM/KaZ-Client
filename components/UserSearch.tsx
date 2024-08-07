"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUsers } from '@/app/api';

interface User {
    _id: string;
    name: string;
    userName: string;
    email: string;
}

interface SearchListProps {
    onUserSelect: (userId: string) => void;
}

const UserSearch: React.FC<SearchListProps> = ({ onUserSelect }) => {
    const [activeUser, setActiveUser] = useState<string | null>(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<User[]>([]);


    const handleUserSelect = (userName: string) => {
        setActiveUser(userName);
        onUserSelect(userName);
    };
    useEffect(() => {
        const handleSearch = async () => {
            if (query.length >= 3) {
                try {
                    const response = await apiUsers.searchUsers(query);
                    console.log("this is search response ==< ", response);
                    setResults(response.users);
                } catch (error) {
                    console.error('Error searching users:', error);
                }
            } else {
                setResults([]);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div>
            <div className="mb-4 mt-2">
                <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Search users..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <ul className="overflow-y-auto">
                {results.map((user_) => (
                    <li
                        key={user_._id}
                        className={`p-2 cursor-pointer rounded-lg my-2 ${activeUser === user_.userName ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-400'}`}
                        onClick={() => handleUserSelect(user_.userName)}
                    >
                        <p className="flex flex-col">
                            <span className="font-bold">{user_.userName}</span>
                            {user_.name}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserSearch;




// "use client"

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface User {
//     _id: string;
//     name: string;
//     userName: string;
//     email: string
// }

// interface SearchListProps {
//     onUserSelect: (userId: string) => void;
// }

// const UserSearch: React.FC<SearchListProps> = ({ onUserSelect }) => {
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState<User[]>([]);




//     useEffect(() => {

//         const handleSearch = async () => {
//             if (query.length >= 3) {
//                 try {
//                     const response = await axios.get(`https://ka-z-severve-git-master-insrams-projects.vercel.app/chat/searchuser/userName/${query}`, {
//                         // const response = await axios.get(`https://ka-z-severve-git-master-insrams-projects.vercel.app/chat/allusers`, {
//                         headers: {
//                             'authorization': `Bearer ${localStorage.getItem('token')}`,
//                         }
//                     });
//                     console.log("this is search response ==< ", response)
//                     setResults(response.data.users);
//                 } catch (error) {
//                     console.error('Error searching users:', error);
//                 }
//             } else {
//                 setResults([]);
//             }
//         };

//         const delayDebounceFn = setTimeout(() => {
//             handleSearch();
//         }, 300); // Delay to avoid too many requests

//         return () => clearTimeout(delayDebounceFn);
//     }, [query]);
//     return (
//         <div className="w-64 bg-gray-100 p-1 overflow-y-auto">
//             <div className="">
//                 <input
//                     type="text"
//                     className="w-auto p-2 border rounded-lg"
//                     placeholder="Search users..."
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                 />

//             </div>
//             <ul className='overflow-y-auto'>
//                 {results.map((user_) => (
//                     <li
//                         key={user_.userName}
//                         className={`p-2 cursor-pointer rounded-lg my-2 bg-gray-200 hover:bg-gray-400`}
//                         // onClick={() => handleUserSelect(user_.user.userName)}
//                         onClick={() => console.log(user_)}
//                     >
//                         <p className='flex flex-col'> <span className='font-bold'>{user_.userName}</span>
//                             {/* {user_.latestMessage} */}
//                         </p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default UserSearch;




