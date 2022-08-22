import React, {useCallback, useEffect, useState, useRef} from 'react';

import {getChuckNorrisAnswer} from "../ChuckNorrisAPI/ChuckNorrisAPI";
import {USER_ID} from "../AppData/AppData";
import "./Conversation.css"


const Conversation = ({selectedChat, refreshList}) => {
    const [currentChat, setCurrentChat] = useState([]);
    const [input, setInput] = useState('');

    const onChange = (e) => {
        const {value} = e.target;

        setInput(value)
    }

    const getAnswer = useCallback(async (messages) => {
        const answer = await getChuckNorrisAnswer();
        const timestamp = Date.now();

        messages.push({
            userId: selectedChat.id,
            message: answer,
            timestamp: timestamp
        })

        localStorage.setItem(`lastMessage-${selectedChat.id}`, JSON.stringify({answer, timestamp}));
        localStorage.setItem(selectedChat.id, JSON.stringify(messages));

        setTimeout(function () {
            setCurrentChat([...messages])
            refreshList()
        }, 1000);

        refreshList()
    },[refreshList, selectedChat.id])

    const onSendClick = async (e) => {
        e.preventDefault();

        if (!input.trim()) return

        const messages = [...currentChat];

        messages.push({
            userId: USER_ID,
            message: input,
            timestamp: Date.now()
        })

        localStorage.setItem(selectedChat.id, JSON.stringify(messages))
        setInput('');
        setCurrentChat([...messages]);

        await getAnswer(messages);
    }

    const getCurrentTimeStamp = (time) => {
        let options = {month: 'numeric', day: 'numeric', year: '2-digit', hour: '2-digit', minute: '2-digit'};
        return new Date(time).toLocaleString('en-US', options);
        // return date
    }

    useEffect(() => {
        if (selectedChat) {
            const chatMessages = localStorage.getItem(selectedChat.id);

            const messages = chatMessages ? JSON.parse(chatMessages) : []
            setCurrentChat([...messages])
        }
    }, [selectedChat, selectedChat.id])


    /*AutoScroll*/
    const messageEl = useRef(null);
    const [, setMessages] = useState([]);


    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const {currentTarget: target} = event;
                target.scroll({top: target.scrollHeight, behavior: 'smooth'});
            });
        }
    }, [])

    useEffect(() => {
        const generateDummyMessage = () => {
            setInterval(() => {
                setMessages(prevMsg => [...prevMsg]);
            }, 2000);
        }
        generateDummyMessage();
    }, []);

    return (
        <div className="chatBoxWrapper">
            <div className="chatBoxHead">
                <div className="chatBoxPicturesWrap">
                    <img className="chatBoxUserPicture"
                         src={selectedChat.image}
                         alt="profilePicture"
                    />
                    <img
                        className="chatOnlineBadgeConv"
                        src="https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png"
                        alt="chatOnlineBadge"
                    />
                </div>
                <div className="chatBoxUserName">{selectedChat.name}</div>
            </div>
            <div className="chatBoxTop" ref={messageEl}>
                {currentChat.map((chat, index) =>
                    <div key={index} className={chat.userId === USER_ID ? "message own" : "message"}>
                        <div className="messageTop">
                            <img
                                className={chat.userId === USER_ID ? "messageImg own" : "messageImg"}
                                src={selectedChat.image}
                                alt="selectedChat"/>
                            <div className="messageText">{chat.message}</div>
                        </div>
                        <div className="messageBottom">{getCurrentTimeStamp(chat.timestamp)}</div>
                    </div>
                )}
            </div>
            <form onSubmit={onSendClick}>

                <div className="chatBoxBottom">
                    <div className="wrapChat">
                        <input
                            value={input}
                            className="chatMessageInput"
                            placeholder="Type your message"
                            onChange={onChange}
                        />
                        <button
                            type="submit"
                            className="chatSubmitButton"
                        ><img
                            className="arrowSend"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAUVBMVEX///9/f397e3t4eHh2dnbr6+vg4OCpqambm5uXl5fj4+Oqqqrv7++ampqmpqb7+/vR0dHBwcGwsLCKioqOjo6MjIzCwsL19fVvb2+Dg4Pb29swfm7bAAAE/0lEQVR4nO2di3raMAyFGwdaWAushZZl7/+gS/AMBHK3pCPr8/8E/LNOjnLZ9vKSyWQymUwmk8lkMuS8faB/ATdu9bZG/wZeisKV76YdixrnLM9qcaGeVbOOxX9caTWPxRXnbOaxKO4d9wZntWhhsTuKB+x1x6Ohve54NmzO0VIeuwxt5bHb0FIe+wztdEe/YTOrFhyHDG3scsOGFna5McP0u2PcMPXumGKYdndMM0x5l5tqmO5zgOmGqXbHHMM08zjPMMVdbq5het0x3zC1PC4xvHRHMo7LDFPa5ZYappPH5YapdEeMYRq7XJxhCrtcrKH+7og31P4cgMJQ9y5HY6i5O6gM9eaRzlBrd1Aa6tzlaA015pHaUN8uR2+orTs4DHW90+Ex1NQdXIZ6djk+Qy3dwWmoozt4DTV0B7chfpfjN0Q/B5AwxHaHjCEyj1KGuF1OzhCVR0lDTB5lDRHvdKQN5Xc5eUPpXQ5hKNsdGEPJXQ5lKNcdOEOp7kAayjwHwBpK7HJoQ/7uQPs18OYRbefh3OXQbgG+XQ5tdoMrj2ive3h2ObRVG47uQDs9Qr/LoY2eoe4OtE8XtLsc2qYbyu5Au/RB1x1ok36ougPtMQTNcwC0xTAU3YF2GCM+j2iDcWLzWDqHVhglbpf7fN98V/WfU6laNTqP5/Xr78+vzfZYrFZKVYl2ucP5o1Hdn6qVPlXi53KHWvXna/PtmvnVosrzHODgB/h0rJyCU+V8LnfwWd1vjw46wALvdC5ZrQf4VICyKvl9zuWyBCgb+e8BrmVTlUKnivo+J5TNtjblVkV/2xnKpjlTLlUl31qHsqkqhqxq+LbzBs9iqOdb6xv3iyGFp+q/c73+2VfxikX55xNt0qY+xL+XaBY0Z1huXtFKnsPHLYh01xy3wvsd1vWJhbtsR3sxdastzu8i9rU7lv7AOArRldtf8l7ntc9YtSIcxR4/0fk8+1E8HQu2E3vwE8qfz9juyJGxYT/e+QyjeCzZR7Hbr9zxnF+43J8ujzNgN/kM83nLWG0mOIo9fnTnFzLmnNDFYwIU/XC93BeYjA0R1Q/XjJGuVKQsz1+TMfHL/Wxi+kHnibWJyx/6148T2w/o3z9GfD+gDYah2M/QDkPQ3D+gLfqh2s/QHn3Q3b+jTbqhvH9Hu3RBe/+OtnmG+v4I7fMI/f072qgNx/072ukenudLaKsblPfvGg35nu+izTycz3fRbg28z3fRdvzvV+B+7O9X0H787x+gfiLvV5B+Mu//YH5c71eUGEq+f8f4SZ0fxlD6/bu8n/T3IcJ+gO9fZP0A34dI/nttiO9fBA1x358J+Yn2g7whJn9yhujvI9n94N9Hcvvh8idhiOoHKUN0/gJsfvD8Bbj8NMynh8Wv3KnxY/n/LdTMp4feD98PbYj9VPRDG1o/XfPpIfRTlr8AnR/w768MQuSnMH8BGj+d8+kh8FOav0C8n9759ET6ib1fWU7c+emeT0+Mn/7za1jsp7gf2iz1S2E+PYv8kshfYImf1v2sm9l+yeQvMNcvpfn0zPJLKn+BOX6pzadn+nym0e/PWJ5PzzS/VM+vYcp8ppm/wLhfuvPpsZu/wLBf2vPpsZu/gOX59PT5pdwPbSzPp6fLz8p8euzmL/DUD8b82oa28hewm7+A3fwFrvkzOJ8eP592+v0Zy/PpsbSfdWM3f5lMJpPJZDKZTCYTxT+EYGPB4LupogAAAABJRU5ErkJggg=="
                            alt="Arrow"/>
                        </button>
                    </div>
                </div>
            </form>

        </div>

    )
};

export default Conversation;