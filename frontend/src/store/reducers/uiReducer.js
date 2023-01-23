import ACTION_TYPES from '../actions/ACTION_TYPES';

const INITIAL_UI_STATE = {
  isLoading: undefined,
};

export default function uiReducer(state = INITIAL_UI_STATE, {type, payload}) {
  switch (type) {
    case ACTION_TYPES.UI.SET_LOADING_SPINNER_STATE:
      return {
        ...state,
        isLoading: payload.isLoading,
      };

    case ACTION_TYPES.UI.RESET_UI:
      return INITIAL_UI_STATE;

    default:
      return state;
  }
}
