import callWebApi from "../../helpers/web.helper";

export const getChats = async () => {
    const result = await callWebApi({
        endpoint: '/chats/',
        type: 'GET'
    })

    return result.json();
}
