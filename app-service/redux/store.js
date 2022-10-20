import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth.slice';
import alertsReducer from '../features/alerts/alerts.slice';

export const store = configureStore({
  reducer: {
    alerts: alertsReducer,
    auth: authReducer,
  },
});
