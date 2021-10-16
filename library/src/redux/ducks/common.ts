import { Reducer, ActionCreator } from 'redux';

enum CommonTypes {
  SET_OPEN_ALERT = 'common/SET_OPEN_ALERT',
  SET_ALERT_SEVERITY = 'common/SET_ALERT_SEVERITY',
  SET_ALERT_BODY = 'common/SET_ALERT_BODY',
  SET_ALERT_TITLE = 'common/SET_ALERT_TITLE',
  SET_GENRES = 'common/SET_GENRES',
  SET_NAMES = 'common/SET_NAMES',
}

const initialState: CommonReducerState = {
  isAlertOpen: false,
  alertSeverity: 'info',
  alertBody: '',
  alertTitle: '',
  names: [],
  genres: [],
};

type setNamesAction = {
  type: CommonTypes.SET_NAMES;
  names: Array<{ name: string; id: number }>;
};

type setGenresAction = {
  type: CommonTypes.SET_GENRES;
  genres: Array<{ name: string; id: number }>;
};

type setAlertTitleAction = {
  type: CommonTypes.SET_ALERT_TITLE;
  title: string;
};

type setOpenAlertAction = {
  type: CommonTypes.SET_OPEN_ALERT;
  open: boolean;
};

export const setGenres: ActionCreator<setGenresAction> = (
  genres: Array<{ name: string; id: number }>
) => ({
  type: CommonTypes.SET_GENRES,
  genres,
});

export const setNames: ActionCreator<setNamesAction> = (
  names: Array<{ name: string; id: number }>
) => ({
  type: CommonTypes.SET_NAMES,
  names,
});

export const setAlertTitle: ActionCreator<setAlertTitleAction> = (
  title: string
) => ({
  type: CommonTypes.SET_ALERT_TITLE,
  title,
});

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
  | setOpenAlertAction
  | setAlertTitleAction
  | setGenresAction
  | setNamesAction;

export const commonReducer: Reducer<CommonReducerState, CommonActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CommonTypes.SET_GENRES:
      return {
        ...state,
        genres: action.genres,
      };
    case CommonTypes.SET_NAMES:
      return {
        ...state,
        names: action.names,
      };
    case CommonTypes.SET_ALERT_TITLE:
      return {
        ...state,
        alertTitle: action.title,
      };
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
