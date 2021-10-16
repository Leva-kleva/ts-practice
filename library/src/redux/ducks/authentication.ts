import { Reducer, ActionCreator } from 'redux';
import { getAccountInfo } from '../../services/getAccountInfo';
import { getUserWishes } from '../../services/getUserWishes';
import { AppDispatch } from '../rootReducer';

enum AuthenticationActionTypes {
  SET_AUTHENTICATION = 'authentication/SET_AUTHENTICATION',
  SET_SIGNIN_STATE = 'authentication/SET_SIGNIN_STATE',
  SET_ACCOUNT_DATA = 'authentication/SET_ACCOUNT_DATA',
  SET_ACCOUNT_WISHES = 'authentication/SET_ACCOUNT_WISHES',
}

const initialState: AuthenticationReducerState = {
  isAuthenticated: false,
  accountInfo: {},
  accountWishes: null,
  inputFieldsState: {
    userName: null,
    password: null,
  },
};

type setAccountDataAction = {
  type: AuthenticationActionTypes.SET_ACCOUNT_DATA;
  accountInfo: any;
};

export const setAccountData: ActionCreator<setAccountDataAction> = (
  accountInfo: any
) => ({
  type: AuthenticationActionTypes.SET_ACCOUNT_DATA,
  accountInfo: accountInfo,
});

type setAccountWishesAction = {
  type: AuthenticationActionTypes.SET_ACCOUNT_WISHES;
  accountInfo: any;
};

export const setAccountWishes: ActionCreator<setAccountWishesAction> = (
  accountInfo: any
) => ({
  type: AuthenticationActionTypes.SET_ACCOUNT_WISHES,
  accountInfo: accountInfo,
});

export const fetchAccountData = () => async (dispatch: AppDispatch) => {
  const accountInfo = await getAccountInfo();
  if (accountInfo) {
    dispatch(setAccountData(accountInfo));
  }
};

export const fetchAccountWishes = () => async (dispatch: AppDispatch) => {
  const accountInfo = await getUserWishes();
  if (accountInfo) {
    dispatch(setAccountData(accountInfo));
  }
};

type setAuthenticationStateAction = {
  type: AuthenticationActionTypes.SET_AUTHENTICATION;
  isAuthenticated: boolean;
};

export const setAuthenticationState: ActionCreator<setAuthenticationStateAction> =
  (value: boolean) => ({
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
  | setAuthenticationStateAction
  | setAccountDataAction
  | setAccountWishesAction;

export const authenticationReducer: Reducer<
  AuthenticationReducerState,
  AuthenticationActions
> = (state = initialState, action) => {
  switch (action.type) {
    case AuthenticationActionTypes.SET_ACCOUNT_WISHES:
      return {
        ...state,
        accountWishes: action.accountInfo,
      };
    case AuthenticationActionTypes.SET_ACCOUNT_DATA:
      return {
        ...state,
        accountInfo: action.accountInfo,
      };
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
