import { createReducer } from "@reduxjs/toolkit"
import { isLogin, userDataClear, userDetail, userToken } from "../Actions/UserAction"

const InitialState = {
    userDetails: {},
    token: "",
    isLogin: false
}
export const userReducer = createReducer(InitialState, builder => {
  builder
    .addCase(userDetail, (state, action) => {
      state.userDetails = action.payload;   // ✅ correct
    })
    .addCase(userToken, (state, action) => {
      state.token = action.payload;         // ✅ correct
    })
    .addCase(isLogin, (state, action) => {
      state.isLogin = action.payload;         // ✅ correct
    })
    .addCase(userDataClear, () => InitialState);

})