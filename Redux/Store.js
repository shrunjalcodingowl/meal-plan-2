import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userReducer } from './Reducers/UserReducer'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  persistStore,
} from "redux-persist";

const rootReducer = combineReducers({
  userData: userReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userData"], 
  // 👆 reducers to persist
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);