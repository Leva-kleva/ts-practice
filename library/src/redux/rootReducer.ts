import { combineReducers, AnyAction } from 'redux';

import { authenticationReducer } from './ducks/authentication';

import { ThunkDispatch } from 'redux-thunk';

export type AppDispatch = ThunkDispatch<AppState, any, AnyAction>;

const rootReducer = combineReducers<AppState>({
  authenticationReducer: authenticationReducer,
});

export { rootReducer };
