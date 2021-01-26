import { Reducer, ActionCreator } from 'redux';

enum EditorActionTypes {
  SET_VALUES = 'editor/SET_VALUES',
}

export type EditorReducerState = {
  storedValues: null | string[];
};

const initialState: EditorReducerState = {
  storedValues: null,
};

type setEditorValuesAction = {
  type: EditorActionTypes.SET_VALUES;
  storedValues: string[];
};

export const setEditorValues: ActionCreator<setEditorValuesAction> = (
  storedValues: string[]
) => ({
  type: EditorActionTypes.SET_VALUES,
  storedValues: storedValues,
});

type EditorActions = setEditorValuesAction;

export const editorReducer: Reducer<EditorReducerState, EditorActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case EditorActionTypes.SET_VALUES:
      return {
        ...state,
        storedValues: action.storedValues,
      };
    default:
      return state;
  }
};
