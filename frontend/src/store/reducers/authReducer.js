import ACTION_TYPES from '../actions/ACTION_TYPES';

const INITIAL_AUTH_STATE = {
  isSignedIn: null,
  userId: null,
  jwt: null,
};

export default function authReducer(state = INITIAL_AUTH_STATE, {type, payload}) {
  switch (type) {
    case ACTION_TYPES.SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: payload.userId,
        jwt: payload.jwt,
      };

    case ACTION_TYPES.SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        jwt: null,
      };

    default:
      return state;
  }
}
