import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import fetchNotis, {
  fetchNotiReport,
  fetchTokenCallVideo,
} from "../request/userRequest";

export const handleFetchNotis = createAsyncThunk(
  "user/handleFetchNotis",
  async (_, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("access_token") || {};
      var decodedPayload = jwt_decode(accessToken)?.dataValues || null;
      const response = await fetchNotis(decodedPayload);
      // if (response.status == 200) {
      console.log(response);

      return response.data;
      // }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        location.href = "/login";
      }
    }
  }
);
export const handleFetchTokenCallVideo = createAsyncThunk(
  "user/handleFetchTokenCallVideo",
  async (_, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("access_token") || {};
      var decodedPayload = jwt_decode(accessToken)?.dataValues || null;
      const response = await fetchTokenCallVideo(decodedPayload.id);
      if (response.status == 200) {
        console.log(response);

        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  }
);
export const handleFetchNotiReport = createAsyncThunk(
  "user/handleFetchNotiReport",
  async (_, thunkAPI) => {
    try {
      const response = await fetchNotiReport();
      if (response.status == 200) {
        console.log(response);

        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
  }
);
const userReducer = createSlice({
  name: "user",
  initialState: {
    nofitycations: [],
    loopNoti: 0,
    tokenCallVideo: null,
    currentCall: null,
    clientCall: null,
    notiReportAdmin: 0,
  },
  reducers: {
    setLoopNoti: (state, action) => {
      return {
        ...state,
        loopNoti: state.loopNoti + 1,
      };
    },
    setClientCall: (state, action) => {
      console.log(action);
      // return {
      //   ...state,
      //   clientCall: action.payload,
      // };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleFetchNotis.fulfilled, (state, action) => {
      state.nofitycations = action.payload;
    });
    builder.addCase(handleFetchNotis.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(handleFetchNotis.rejected, (state, action) => {
      console.log("rejected");
      console.log(action);
    });
    builder.addCase(handleFetchTokenCallVideo.fulfilled, (state, action) => {
      console.log(action);
      state.tokenCallVideo = action.payload.tokenVideo;
    });
    builder.addCase(handleFetchTokenCallVideo.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(handleFetchTokenCallVideo.rejected, (state, action) => {
      console.log("rejected");
      console.log(action);
    });
    builder.addCase(handleFetchNotiReport.fulfilled, (state, action) => {
      console.log(action.payload);
      state.notiReportAdmin = action.payload.numberNoti;
    });
    builder.addCase(handleFetchNotiReport.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(handleFetchNotiReport.rejected, (state, action) => {
      console.log("rejected");
      console.log(action);
    });
  },
});

export const { setLoopNoti, setClientCall } = userReducer.actions;

export default userReducer.reducer;
