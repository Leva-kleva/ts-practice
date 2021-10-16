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
  accountWishes: any;
  inputFieldsState: {
    userName: string | boolean | null;
    password: string | boolean | null;
  };
};

type CommonReducerState = {
  isAlertOpen: boolean;
  alertSeverity: AlertSeverity;
  alertBody: string;
  alertTitle: string;
  genres: Array<{ name: string; id: number }>;
  names: Array<{ name: string; id: number }>;
};

type AlertSeverity = 'error' | 'warning' | 'info' | 'success';
