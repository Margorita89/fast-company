import React from "react";
import { useState } from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    console.log(users);

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id !== userId));
    };

    const renderPhrase = (number) => {
        let numberOfPeople = "";
        if (number === 1) {
            numberOfPeople = `${number} человек тусанет с тобой сегодня`
        } else if (number>= 1 && number<=4 ){
            numberOfPeople = `${number} человека тусанут с тобой сегодня`
        } else if (number >=  5){
            numberOfPeople = `${number} человек тусанут с тобой сегодня`
        } else if(number === 0){
            numberOfPeople = `Никто не тусанет с тобой сегодня`
        }
    return (
        <>
        <h1><span className= {number ===0 ? 'badge bg-danger' :'badge bg-primary'}>{numberOfPeople}</span></h1>
        </>
    )
};

    return (
        <>
    {renderPhrase(users.length)}

    <table className="table-primary">
                {users.length ===0 ? '' :
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>}

                <tbody>
                {users.map(user => {
                    return (
                        <tr key={user._id}>
                            <td>{user.name}</td>

                            <td>
                                {user.qualities.map(qualitie => (
                                    <span
                                        key={qualitie._id}
                                        className={`badge bg-${qualitie.color} m-1`}
                                    >
                                        {qualitie.name}
                                    </span>)
                                )}
                            </td>

                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate}/5</td>

                            <td>
                                <button
                                className="btn btn-danger"
                                onClick={()=>handleDelete(user._id)}
                                >
                                Удалить
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    );
};

export default Users;