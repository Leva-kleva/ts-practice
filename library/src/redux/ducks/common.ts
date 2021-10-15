import { Reducer, ActionCreator } from 'redux';

enum CommonTypes {
  SET_OPEN_ALERT = 'common/SET_OPEN_ALERT',
  SET_ALERT_SEVERITY = 'common/SET_ALERT_SEVERITY',
  SET_ALERT_BODY = 'common/SET_ALERT_BODY',
}

const initialState: CommonReducerState = {
  isAlertOpen: false,
  alertSeverity: 'info',
  alertBody: '',
};

type setOpenAlertAction = {
  type: CommonTypes.SET_OPEN_ALERT;
  open: boolean;
};

export const setOpenAlert: ActionCreator<setOpenAlertAction> = (
  open: boolean
) => ({
  type: CommonTypes.SET_OPEN_ALERT,
  open,
});

type setAlertSeverityAction = {
  type: CommonTypes.SET_ALERT_SEVERITY;
  severity: AlertSeverity;
};

export const setAlertSeverity: ActionCreator<setAlertSeverityAction> = (
  severity: AlertSeverity
) => ({
  type: CommonTypes.SET_ALERT_SEVERITY,
  severity,
});

type setAlertBodyAction = {
  type: CommonTypes.SET_ALERT_BODY;
  body: string;
};

export const setAlertBody: ActionCreator<setAlertBodyAction> = (
  body: string
) => ({
  type: CommonTypes.SET_ALERT_BODY,
  body,
});

type CommonActions =
  | setAlertBodyAction
  | setAlertSeverityAction
  | setOpenAlertAction;

export const commonReducer: Reducer<CommonReducerState, CommonActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CommonTypes.SET_ALERT_BODY:
      return {
        ...state,
        alertBody: action.body,
      };
    case CommonTypes.SET_ALERT_SEVERITY:
      return {
        ...state,
        alertSeverity: action.severity,
      };
    case CommonTypes.SET_OPEN_ALERT:
      return {
        ...state,
        isAlertOpen: action.open,
      };
    default:
      return state;
  }
};
