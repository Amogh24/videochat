import * as chatActions from '../actions/chatActions';

const initState = {
    username:'',
    secret:''
}

const reducer = (state = initState,action) =>{
    switch(action.type){
        case chatActions.CHAT_SET_SECRET:
            return{
                ...state,
                secret:action.secret
            }
        case chatActions.CHAT_SET_USERNAME:
            return{
                ...state,
                username:action.username
            }
        default: 
            return state
    }
}
export default reducer