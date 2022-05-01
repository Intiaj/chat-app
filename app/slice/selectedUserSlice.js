import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
};

export const selectedUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectedUser: (state, action) => {
      state.user = `${action.payload}`;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectedUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
