import { createAction } from '@reduxjs/toolkit'

export const USER_DETAILS = 'userDetails/setUser'
export const TOKEN = 'token/setToken'
export const ISLOGIN = 'isLogin'
export const CLEAR = 'setClear'

export const userDetail = createAction(USER_DETAILS);
export const userToken = createAction(TOKEN);
export const isLogin = createAction(ISLOGIN);
export const userDataClear = createAction(CLEAR);
