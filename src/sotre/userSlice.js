import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "Lee", age: 27 },
  reducers: {
    setUser(state) {
      return "LCM";
    },
    increaseAge(state, a) {
      state.age += a.payload;
    },
  },
});
export let { setUser, increaseAge } = user.actions;

export default user;
