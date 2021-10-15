interface Window {
  token: string;
}

type AppState = {
  authenticationReducer: AuthenticationReducerState;
};

type AuthenticationReducerState = {
  isAuthenticated: boolean;
  accountInfo: { [key: string]: string };
  inputFieldsState: {
    userName: string | boolean | null;
    password: string | boolean | null;
  };
};
