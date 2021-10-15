interface Window {
  token: string;
}

type AppState = {
  authenticationReducer: AuthenticationReducerState;
  commonReducer: CommonReducerState;
};

type AuthenticationReducerState = {
  isAuthenticated: boolean;
  accountInfo: { [key: string]: string };
  inputFieldsState: {
    userName: string | boolean | null;
    password: string | boolean | null;
  };
};

type CommonReducerState = {
  isAlertOpen: boolean;
  alertSeverity: AlertSeverity;
  alertBody: string;
};

type AlertSeverity = 'error' | 'warning' | 'info' | 'success';
