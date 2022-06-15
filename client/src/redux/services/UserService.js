import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "../../utils/cookie";

/* 
  추후에 catch 부분 추가해야 할 부분이 있음.
  이미지 업로드 부분과 로그아웃 부분
*/

const http = "http://localhost:4000";

const config = {
  headers: {
    'content-type': 'multipart/form-data',
  }
};

const verifyToken = {
  headers: {
    Authorization: getCookie("users"),
  }
};

export const postUserLogin = createAsyncThunk(
  "POST_LOGIN",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${http}/login`, loginData, verifyToken);
      setCookie("users", data.accessToken);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const putUpdateUser = createAsyncThunk(
  "PUT_UPDATE/USER",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${http}/my`, userData, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const putUserImage = createAsyncThunk(
  "PUT_UPDATE/IMAGE",
  async (imageData) => {
    try {
      const { data } = await axios.put(`${http}/my`, imageData, config);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getUserLogOut = createAsyncThunk(
  "GET_LOGOUT",
  async () => {
    try {
      const { data } = await axios.get(`${http}/logout`, {crossDomain: true});
      if (data.success) deleteCookie("users");
    } catch (err) {
      console.log(err);
    }
  }
)