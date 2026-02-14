import { createReducer } from "@reduxjs/toolkit"
import { userDetail } from "../Actions/UserAction"

const InitialState = {
    userDetails: {}
}
export const userReducer = createReducer(InitialState, builder => {
  builder
    .addCase(userDetail, (state, action) => {
      return {
        ...state.userDetails,
        ...action.payload,
      }
    })
})