import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./API";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((c) => {
                if (c._id === id) {
                    return { ...c, bookmark: !c.bookmark };
                } else {
                    return c;
                }
            })
        );
    };

    return (
        <>
            <SearchStatus length={users.length} />
            <Users
                users={users}
                onDelete={handleDelete}
                onToggle={handleToggleBookMark}
            />
        </>
    );
};

export default App;
