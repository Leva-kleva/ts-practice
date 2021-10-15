interface Window {
  token: string;
}

type AppState = {
  authenticationReducer: AuthenticationReducerState;
};

type AuthenticationReducerState = {
  isAuthenticated: boolean;
  userData: {};
  inputFieldsState: {
    userName: string | boolean | null;
    password: string | boolean | null;
  };
};
