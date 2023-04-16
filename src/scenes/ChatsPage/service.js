import callWebApi from "../../helpers/web.helper";

export const getChats = async () => {
    const result = await callWebApi({
        endpoint: '/chats/',
        type: 'GET'
    })

    return result.json();
}

export const getMe = async () => {
    const result = await callWebApi({
        endpoint: '/users/own',
        type: 'GET'
    })

    return result.json();
}

export const getMessages = async (id) => {
    const result = await callWebApi({
        endpoint: `/chats/${id}/messages`,
        type: 'GET'
    })

    return result.json();
}

export const createChat = async (id) => {
    const result = await callWebApi({
        endpoint: `/chats/create_chat`,
        type: 'POST',
        request: {
            user_id: id
        }
    })

    return result.json();
}