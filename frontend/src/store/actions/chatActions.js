export const CHAT_SET_USERNAME = 'CHAT.SET_USERNAME'
export const CHAT_SET_SECRET = 'CHAT.SET_SECRET'

export const setUser = (username) =>{
    return {
        type: CHAT_SET_USERNAME,
        username
      };
}

export const setSecret = (secret) =>{
    return {
        type: CHAT_SET_SECRET,
        secret
      };
}

