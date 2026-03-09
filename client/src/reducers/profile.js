import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES, RESET_PROFILE_LOADING } from "../actions/types"

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
}

export default function(state=initialState, action){
  const  {type, payload} = action
  switch(type){
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        errror: payload,
        loading: false,
        profile: null
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      }
    case RESET_PROFILE_LOADING:
        return {
          ...state,
          loading: true
        }
    default: 
      return state;
  }
}