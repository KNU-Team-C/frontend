import callWebApi from "../../helpers/web.helper";

export const getProfile = async ({own, id}) => {
    console.log('GETTING PROFILE', own, id);
    const path = own ? '/users/own' : ('/users/' + id);
    console.log('ENDPOINT', path);
    const result = await callWebApi({
        endpoint: path,
        type: 'GET',
    });

    return result.json();
};

export const editProfile = async (payload) => {
    console.log('EDITING PROFILE', payload);
    const path = "/users/" + payload.id
    const result = await callWebApi({
            endpoint: path,
            request: payload,
            type: 'PUT',
        }
    )
    return result.json();
}
