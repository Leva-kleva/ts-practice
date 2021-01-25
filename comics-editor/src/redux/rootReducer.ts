import { combineReducers, AnyAction } from 'redux';
import {
  authenticationReducer,
  AuthenticationReducerState,
} from './ducks/authentication';
import { ThunkDispatch } from 'redux-thunk';

export type AppState = {
  authenticationReducer: AuthenticationReducerState;
};

export type AppDispatch = ThunkDispatch<AppState, any, AnyAction>;

export const rootReducer = combineReducers<AppState>({
  authenticationReducer: authenticationReducer,
});
