import axios from "axios";
import * as EmageApi from "../Api/ApiEmage";

export const SendEmageProfile = (userId,formData) => async (dispatch) => {
  try {
    const {data} = await EmageApi.profileApi(userId,formData);
    dispatch({ type: "PROFILE_EMAGE_SUCCESS", data:data.data });
  } catch (err) {
    console.log(err)
  }
};

export const SendEmageProfileCover = (userId,formData) => async (dispatch) => {
  try {
    const {data} = await EmageApi.coverApi(userId,formData);
    dispatch({ type: "PROFILE_COVER_SUCCESS", data:data.data });
  } catch (err) {
    console.log(err)
  }
};

export const SendEmageProfilePost = (userId,formData) => async (dispatch) => {
  try {
    const {data} = await EmageApi.postApi(userId,formData);
    dispatch({ type: "PROFILE_ALLPOSTS_SUCCESS", data:data.data });
  } catch (err) {
    console.log(err)
  }
};

