import React from 'react'
import {Routes, Route} from "react-router-dom"

import Messenger from "./Components/Messenger/Messenger";
import Login from "./Components/Login/Login";
import Conversation from "./Components/Conversation/Conversation";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/chats" element={<Messenger/>}>
                <Route path={"/chats/:chatId"} element={<Conversation/>}/>
            </Route>
        </Routes>
    );
}

export default App;
