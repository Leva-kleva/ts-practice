import { Reducer, ActionCreator } from 'redux';

enum AuthenticationActionTypes {
  SET_AUTHENTICATION = 'authentication/SET_AUTHENTICATION',
  SET_SIGNIN_STATE = 'authentication/SET_SIGNIN_STATE',
}

const initialState: AuthenticationReducerState = {
  isAuthenticated: false,
  userData: {},
  inputFieldsState: {
    userName: null,
    password: null,
  },
};

type setAuthenticationStateAction = {
  type: AuthenticationActionTypes.SET_AUTHENTICATION;
  isAuthenticated: boolean;
};

export const setAuthenticationState: ActionCreator<setAuthenticationStateAction> = (
  value: boolean
) => ({
  type: AuthenticationActionTypes.SET_AUTHENTICATION,
  isAuthenticated: value,
});

type setInputFieldsStateAction = {
  type: AuthenticationActionTypes.SET_SIGNIN_STATE;
  inputFieldsState: any;
};

export const setInputFieldsState: ActionCreator<setInputFieldsStateAction> = (
  state: any
) => ({
  type: AuthenticationActionTypes.SET_SIGNIN_STATE,
  inputFieldsState: state,
});

type AuthenticationActions =
  | setInputFieldsStateAction
  | setAuthenticationStateAction;

export const authenticationReducer: Reducer<
  AuthenticationReducerState,
  AuthenticationActions
> = (state = initialState, action) => {
  switch (action.type) {
    case AuthenticationActionTypes.SET_SIGNIN_STATE:
      return {
        ...state,
        inputFieldsState: action.inputFieldsState,
      };
    case AuthenticationActionTypes.SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    default:
      return state;
  }
};
