import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import fetchNotis, {
  fetchFriends,
  fetchNotiReport,
  fetchRequestFriends,
  fetchTokenCallVideo,
  handleAcceptFriend,
  handleRefuseFriend,
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
      // if (e.response.status == 401) {
      //   location.href = "/login";
      // }
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
export const handleFetchFriends = createAsyncThunk(
  "user/handleFetchFriends",
  async (_, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("access_token") || {};
      var decodedPayload = jwt_decode(accessToken)?.dataValues || null;
      const response = await fetchFriends(decodedPayload.id);
      if (response.status == 200) {
        console.log(response);

        return response.data;
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        location.href = "/login";
      }
    }
  }
);
export const handleAccept = createAsyncThunk(
  "user/handleAccept",
  async (data, thunkAPI) => {
    try {
      console.log(data);

      const response = await handleAcceptFriend(data);
      if (response.status == 200) {
        console.log(response);

        return response.data;
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        location.href = "/login";
      }
    }
  }
);
export const handleRefuse = createAsyncThunk(
  "user/handleRefuse",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const { id } = data;

      const response = await handleRefuseFriend(id);
      if (response.status == 200) {
        console.log(response);

        return response.data;
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        location.href = "/login";
      }
    }
  }
);
export const handleFetchRequestFriend = createAsyncThunk(
  "user/handleFetchRequestFriend",
  async (_, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("access_token") || {};
      var decodedPayload = jwt_decode(accessToken)?.dataValues || null;
      const response = await fetchRequestFriends(decodedPayload.id);
      if (response.status == 200) {
        console.log(response);

        return response.data;
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        location.href = "/login";
      }
    }
  }
);
const userReducer = createSlice({
  name: "user",
  initialState: {
    nofitycations: null,
    loopNoti: 0,
    tokenCallVideo: null,
    currentCall: null,
    clientCall: null,
    notiReportAdmin: 0,
    requestFriend: null,
    friends: null,
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
    builder.addCase(handleFetchFriends.fulfilled, (state, action) => {
      console.log("friend", action.payload);
      state.friends = action.payload;
    });
    builder.addCase(handleFetchFriends.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(handleFetchFriends.rejected, (state, action) => {
      console.log("rejected");
      console.log(action);
    });
    builder.addCase(handleFetchRequestFriend.fulfilled, (state, action) => {
      console.log("request friend", action.payload);
      state.requestFriend = action.payload;
    });
    builder.addCase(handleFetchRequestFriend.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(handleFetchRequestFriend.rejected, (state, action) => {
      console.log("rejected");
      console.log(action);
    });
  },
});

export const { setLoopNoti, setClientCall } = userReducer.actions;

export default userReducer.reducer;
