import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth';
import ticketReducer from './tickets';
import teamReducer from './team';
import userReducer from './user';
import ticketActivityReducer from './ticketActivity';
export const store = configureStore({
  reducer: {
    authReducer,
    ticketReducer,
    teamReducer,
    userReducer,
    ticketActivityReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
