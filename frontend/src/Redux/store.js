
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import authReducer from "./authSlice"
import medicineReducer from "./medicineSlice"
import reminderReducer from "./reminderSlice"
import schemeReducer from "./schemeSlice"
import prescriptionReducer from "./prescriptionSlice"
import userReducer from "./userSlice"

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
   auth: authReducer,
  medicine: medicineReducer,
  reminder: reminderReducer,
  scheme: schemeReducer,
  prescription: prescriptionReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
