import axios from "axios";
import * as AuthApi from "../Api/AuthApi";

export const login = (formData, navigate) => async(dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    console.log(formData);
    const response = await AuthApi.login(formData);
    localStorage.setItem("token", response.data.token);
    dispatch({ type: "AUTH_SUCCESS",data:response.data.user, status:response.data.status, message:response.data.message ,token:response.data.token });

    console.log(response.data)
    const hasCompleted = response.data.user.profilecomplate;
    console.log(hasCompleted)
     if(hasCompleted === 1) {
      navigate("/chat");
      }else{
      navigate("/profileComplete");
    }
  } catch (err) {
    if (
      err.response &&
      err.response.status >= 400 &&
      err.response.status <= 500
    ) {
      console.log(err.response.data.message)
      dispatch({ type: "AUTH_ERROR", message: err.response.data.message ,status:err.response.data.status});
    }
  }
};

export const register = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });

  try {
    const res = await AuthApi.register(formData);
    if (res.data.status === "success") {
      dispatch({ type: "AUTH_SUCCESS" ,status:res.data.status,message:res.data.message});
      navigate("/verify", { replace: true });
    }
  } catch (err) {
    if (
      err.response &&
      err.response.status >= 400 &&
      err.response.status <= 500
    ) {
      dispatch({ type: "AUTH_ERROR", message: err.response.data.message,status:err.response.data.status });
    }
  }
};

export const updateUserPfile = async (formData, userId, navigate) => {
  try {
    const res = await AuthApi.profileComplate(userId, formData);
    if (res.data.status === "success") {
      navigate("/interests", { replace: true });
    }
  } catch (err) {
    if (
      err.response &&
      err.response.status >= 400 &&
      err.response.status <= 500
    ) {
      dispatch({ type: "AUTH_ERROR", message: err.response.data.message });
    }
  }
};

export const userInterests = async (userID, sendData, navigate) => {
  try {
    // Use formData directly as the second argument
    const res = await AuthApi.userInterestsAPI(userID, sendData);

    if (res.data.status === "success") {
      navigate("/");
    }
  } catch (err) {
    if (
      err.response &&
      err.response.status >= 400 &&
      err.response.status <= 500
    ) {
      seterror(err.response.data.message);
    }
  }
};

export const logout = (navigete) => async(dispatch) => {
  try {
    const res = await  AuthApi.logout();
    if (res.data.status === "success") {
      dispatch({ type: "LOG_OUT" });
      navigete('/')
    }
  } catch (err) {
    setmessage(err.message);
  }
};
