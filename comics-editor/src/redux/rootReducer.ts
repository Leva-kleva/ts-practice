import { combineReducers, AnyAction } from 'redux';
import {
  authenticationReducer,
  AuthenticationReducerState,
} from './ducks/authentication';
import { dashboardReducer, DashboardReducerState } from './ducks/dashboard';
import { editorReducer, EditorReducerState } from './ducks/editor';
import { ThunkDispatch } from 'redux-thunk';

export type AppState = {
  authenticationReducer: AuthenticationReducerState;
  dashboardReducer: DashboardReducerState;
  editorReducer: EditorReducerState;
};

export type AppDispatch = ThunkDispatch<AppState, any, AnyAction>;

export const rootReducer = combineReducers<AppState>({
  authenticationReducer: authenticationReducer,
  dashboardReducer: dashboardReducer,
  editorReducer: editorReducer,
});
