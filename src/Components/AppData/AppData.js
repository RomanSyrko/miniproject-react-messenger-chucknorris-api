export const CHAT_LIST = [{
    id: '001',
    image: "https://www.kindpng.com/picc/m/404-4042717_face-profile-png-circle-profile-picture-hd-png.png",
    name: "Alice Freeman"
}, {
    id: '002',
    image: "https://png.pngitem.com/pimgs/s/128-1284293_marina-circle-girl-picture-in-circle-png-transparent.png",
    name: "Josefina"
}, {
    id: '003',
    image: "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png",
    name: "Valazquez"
}, {
    id: '004',
    image: "https://www.pngfind.com/pngs/m/488-4887957_facebook-teerasej-profile-ball-circle-circular-profile-picture.png",
    name: "Barrera"
}]
export const USER_ID = 1000;

export const getChatList = () => {
    let chatList = CHAT_LIST.map(chat => {
        const stringMessage = localStorage.getItem(`lastMessage-${chat.id}`)

        const currentPreview = stringMessage ? JSON.parse(stringMessage) : '';

        chat.preview = currentPreview.answer;
        chat.timestamp = currentPreview.timestamp || 0;

        return chat;
    })

    chatList = chatList.sort(((a, b) => b.timestamp - a.timestamp));

    return chatList;
}