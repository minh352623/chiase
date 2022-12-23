import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

export const fetchCurrentUser = createAction("getUser");

const authReducer = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLogin: false,
    isLoadPost: 0,
    socket: null,
  },
  reducers: {
    setUser: (state, action) => {
      if (Object.keys(action.payload).length === 0) {
        return {
          ...state,
          isLogin: false,
          user: {},
        };
      }
      return {
        ...state,
        isLogin: true,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    },
    setUpLoadPost: (state, action) => {
      return {
        ...state,
        isLoadPost: state.isLoadPost + 1,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setUser, setUpLoadPost, setSocket } = authReducer.actions;

export default authReducer.reducer;
