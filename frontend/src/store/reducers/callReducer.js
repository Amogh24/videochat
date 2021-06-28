import * as callActions from '../actions/callActions';

const initState = {
  localstream:null
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case callActions.CALL_SET_LOCAL_STREAM:
      return {
        ...state,
        localstream:action.localStream
      };
      
    default:
      return state;
  }
}
;

export default reducer;
