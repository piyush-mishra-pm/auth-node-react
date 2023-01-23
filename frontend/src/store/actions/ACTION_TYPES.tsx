const ACTION_TYPES = {
  AUTH: {
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT',
  },

  USER: {
    // User's personally identifiable information.
    FILL_PII: 'FILL_PII',
    RESET_PII: 'RESET_PII',
  },

  UI: {
    SET_LOADING_SPINNER_STATE: 'SET_LOADING_SPINNER_STATE',
    RESET_UI: 'RESET_UI',
  },
};

export default ACTION_TYPES;
