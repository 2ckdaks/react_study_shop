import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./sotre/userSlice";

// let user = createSlice({
//   name: "user",
//   initialState: { name: "Lee", age: 27 },
//   reducers: {
//     setUser(state) {
//       return "LCM";
//     },
//     increaseAge(state, a) {
//       state.age += a.payload;
//     },
//   },
// });
// export let { setUser, increaseAge } = user.actions;

// redux toolkit을 사용하여 공유할 스테이트 생성
let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let item = createSlice({
  name: "item",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  // 스테이트 변경함수 사용법
  reducers: {
    addCount(state, action) {
      let id = state.findIndex((item) => {
        return item.id === action.payload;
      });
      state[id].count++;
    },
    addItem(state, action) {
      state.push(action.payload);
    },
  },
});
// 스테이트 변경함수 생성 이후 등록 필수
export let { addCount, addItem } = item.actions;

// 스테이트 생성 이후 등록 필수
export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    item: item.reducer,
  },
});
