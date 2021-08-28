import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getLocalUser,
  setLocalUser,
  removeLocalUser,
} from "../services/localstorage";
const initialState = {
  loading: false,
  user: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    getUser: (state) => {
      state.user = JSON.parse(getLocalUser("user"));
    },
    removeUser: (state) => {
      state.user = removeLocalUser("user");
    },
    login: (state, action) => {
      state.user = action.payload.user;
      setLocalUser(state.user);
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});

export const { getUser, removeUser, login, setLoading } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectLoading = (state) => state.user.loading;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default userSlice.reducer;