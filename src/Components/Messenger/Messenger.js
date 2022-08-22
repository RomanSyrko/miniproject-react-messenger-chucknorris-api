import React, {useState} from 'react';

import {CHAT_LIST, getChatList} from '../AppData/AppData';
import UserList from "../UserList/UserList";
import Conversation from "../Conversation/Conversation";
import "./Messenger.css"


const Messenger = () => {
    const [selectedChat, setSelectedChat] = useState(CHAT_LIST[0])
    const [, setRefresh] = useState(false)
    const [search, setSearch] = useState('')

    const setCurrentChat = (user) => {
        setSelectedChat({...user})
    }

    const refreshList = () => {
        setRefresh((refresh) => !refresh)
    }

    const onChange = (e) => {
        const {value} = e.target;

        setSearch(value)
    }

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuTop">
                    <img
                        className="profilePicture"
                        src="https://toppng.com/public/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
                        alt="profilePicture"/>
                    <div className="chatMenuWrapper">
                        <div className="searcher">
                            <button className="searchImgBtn">
                                <img
                                    className="searchImg"
                                    src="https://www.seekpng.com/png/full/71-712261_lens-clipart-magnifier-search-icon-png-grey.png"
                                    alt="searchImg"
                                />
                            </button>
                            <input
                                className="chatMenuInput"
                                placeholder="Search or start new chat"
                                onChange={onChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="textChat">Chats</div>
                {getChatList().map(chat => {
                        if (search) {
                            if (chat.name.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
                                return (
                                    <UserList
                                        key={chat.id}
                                        chat={chat}
                                        setCurrentChat={setCurrentChat}
                                    />
                                )
                            }
                            return null
                        }

                        return (
                            <UserList
                                key={chat.id}
                                chat={chat}
                                setCurrentChat={setCurrentChat}
                            />
                        )
                    }
                )}

            </div>
            <div className="chatBox">
                {selectedChat && (
                    <Conversation selectedChat={selectedChat} refreshList={refreshList}/>
                )}
            </div>

        </div>
    );
};

export default Messenger;