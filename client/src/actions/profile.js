import axios from "axios";
import {setAlert} from "./alert";

import {
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  RESET_PROFILE_LOADING
} from "./types"

// Get current user's profile

export const getCurrentProfile = () => async dispatch => { 
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Get all profiles
export const getProfiles = () => async dispatch => { 
  dispatch({type: CLEAR_PROFILE});
  dispatch({type: RESET_PROFILE_LOADING})
  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Get profile by id
export const getProfileById = userId => async dispatch => { 
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}


// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const res = await axios.post("/api/profile", formData, config)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? "Profil mis à jour": "Profil créé", "success"))

    if(!edit){
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
};

// Add book
export const addBook = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const res = await axios.put("/api/profile/book", formData, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert("Livre ajouté", "success"));

    history.push("/dashboard");

  } catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}


// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const res = await axios.put("/api/profile/education", formData, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert("Education ajoutée", "success"));

    history.push("/dashboard");

  } catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Delete book
export const deleteBook = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/book/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert("Livre supprimé", "success"))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Delete Education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert("Education supprimé", "success"))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Delete account and profile

export const deleteAccount = () => async dispatch => {
  if(window.confirm("Sûr ? Cette opération est irréversible")){
    try {
      await axios.delete("/api/profile/")
      dispatch({
        type: CLEAR_PROFILE,
      })

      dispatch({
        type: ACCOUNT_DELETED
      })
  
      dispatch(setAlert("Votre compte a été supprimé"))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status}
      })
    }
  }
}