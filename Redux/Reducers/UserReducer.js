import { createReducer } from "@reduxjs/toolkit"
import { isLogin, selectedAdress, userDataClear, userDetail, userToken } from "../Actions/UserAction"

const InitialState = {
    userDetails: {},
    token: "",
    isLogin: false,
    selectedAddress: {}
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
    .addCase(selectedAdress, (state, action) => {
      state.selectedAddress = action.payload;         // ✅ correct
    })
    .addCase(userDataClear, () => InitialState);

})