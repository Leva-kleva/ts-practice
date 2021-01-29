import { Reducer, ActionCreator } from 'redux';
import { getLessons } from '../../services/getLessons';
import getAccountInfo from '../../services/getAccountInfo';
import { AppDispatch } from '../rootReducer';

enum DashboardActionTypes {
  SET_DATA = 'dashboard/SET_DATA',
  SET_ACCOUNT_INFO = 'dashboard/SET_ACCOUNT_INFO',
  SET_ACCOUNT_IMAGE = 'dashboard/SET_ACCOUNT_IMAGE',
  SET_SELECTED_LEVEL = 'dashboard/SET_SELECTED_LEVEL',
}

export type DashboardReducerState = {
  data: any;
  accountInfo: any;
  // accountImage: any;
  selectedlevel: {
    levelIndex: number | null;
    lessonIndex: number | null;
  };
};

const initialState: DashboardReducerState = {
  data: null,
  accountInfo: null,
  // accountImage: require('../../assets/img/anonymous.svg'),
  selectedlevel: {
    levelIndex: null,
    lessonIndex: null,
  },
};

type setDataAction = {
  type: DashboardActionTypes.SET_DATA;
  data: any;
};

export const setData: ActionCreator<setDataAction> = (data: any) => ({
  type: DashboardActionTypes.SET_DATA,
  data,
});

export const fetchData = () => async (dispatch: AppDispatch) => {
  const data = await getLessons('/api/lessons/levels');
  if (data) {
    dispatch(setData(data));
  }
};

type setAccountDataAction = {
  type: DashboardActionTypes.SET_ACCOUNT_INFO;
  accountInfo: any;
};

export const setAccountData: ActionCreator<setAccountDataAction> = (
  accountInfo: any
) => ({
  type: DashboardActionTypes.SET_ACCOUNT_INFO,
  accountInfo: accountInfo,
});

type setAccountImageAction = {
  type: DashboardActionTypes.SET_ACCOUNT_IMAGE;
  payload: any;
};

export const setAccountImage: ActionCreator<setAccountImageAction> = (
  accountImage: any
) => ({
  type: DashboardActionTypes.SET_ACCOUNT_IMAGE,
  payload: accountImage,
});

export const fetchAccountData = () => async (dispatch: AppDispatch) => {
  const accountInfo = await getAccountInfo();
  if (accountInfo) {
    dispatch(setAccountData(accountInfo));
  }
};

type setSelectedLevelAction = {
  type: DashboardActionTypes.SET_SELECTED_LEVEL;
  selectedlevel: any;
};

export const setSelectedLevel: ActionCreator<setSelectedLevelAction> = (
  selectedlevel: any
) => ({
  type: DashboardActionTypes.SET_SELECTED_LEVEL,
  selectedlevel,
});

export const updateDashboardData = async (dispatch: AppDispatch) => {
  const newAccountInfo = await getAccountInfo();
  const updatedDashboardData = await getLessons('/api/lessons/levels');
  dispatch(setData(updatedDashboardData));
  dispatch(setAccountData(newAccountInfo));
};

type DashboardActions =
  | setDataAction
  | setAccountDataAction
  | setAccountImageAction
  | setSelectedLevelAction;

export const dashboardReducer: Reducer<
  DashboardReducerState,
  DashboardActions
> = (state = initialState, action) => {
  switch (action.type) {
    case DashboardActionTypes.SET_DATA:
      return {
        ...state,
        data: action.data,
      };
    case DashboardActionTypes.SET_SELECTED_LEVEL:
      return {
        ...state,
        selectedlevel: action.selectedlevel,
      };
    case DashboardActionTypes.SET_ACCOUNT_INFO:
      return {
        ...state,
        accountInfo: action.accountInfo,
      };
    case DashboardActionTypes.SET_ACCOUNT_IMAGE:
      return {
        ...state,
        accountImage: action.payload,
      };
    default:
      return state;
  }
};
