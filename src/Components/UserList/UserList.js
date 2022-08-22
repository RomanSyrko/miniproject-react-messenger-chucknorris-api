import React from 'react';
import {NavLink} from "react-router-dom";

import ChatOnline from "../ChatOnline/ChatOnline";
import "./UserList.css"


const UserList = ({chat, setCurrentChat}) => {

    const getCurrentTimeStamp = (time) => {
        let options = {month: 'short', day: 'numeric', year: 'numeric'};
        return new Date(time).toLocaleString('en-US', options);
    }

    return (
        <div className="userListOverlay">
            <NavLink to={`/chats/${chat.id}`} className="userList" onClick={() => setCurrentChat(chat)}>
                <div className="displayFlex">
                    <img
                        className="userListImg"
                        src={chat.image}
                        alt="userListImg"
                    />
                    <ChatOnline/>
                    <div className="flexDirectionColumn">
                        <div className="userListName">{chat.name}</div>
                        <div className="userListText">{chat.preview}</div>
                    </div>
                </div>
                <div className="userListTime">{getCurrentTimeStamp(chat.timestamp)}</div>
            </NavLink>
        </div>
    );
};

export default UserList;