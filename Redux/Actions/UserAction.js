import { createAction } from '@reduxjs/toolkit'

export const USER_DETAILS = 'userDetails/setUser'
export const TOKEN = 'userDetails/setToken'

export const userDetail = createAction(USER_DETAILS);
export const userToken = createAction(TOKEN);
