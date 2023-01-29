import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';

import {AUTH_STATE, STATE, USER_STATE} from '../store/STATE_DEFINITIONS';
import {useHttpClient} from '../hooks/httpHook';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorModal from '../components/ErrorModal';
import {useUserDispatcher, useAuthDispatcher} from '../store/actions/DISPATCH_HOOK_REGISTRY';
import ACTION_TYPES from '../store/actions/ACTION_TYPES';

function Home() {
  const authState: AUTH_STATE = useSelector((state: STATE) => state.auth);
  const userState: USER_STATE = useSelector((state: STATE) => state.user);

  const userDispatcher = useUserDispatcher();
  const authDispatcher = useAuthDispatcher();
  const history = useHistory();
  const {isLoading, error, sendRequest, clearErrorHandler} = useHttpClient();

  useEffect(() => {
    (async function onLogoutClickHandler() {
      try {
        const response = await sendRequest({
          successMessage: 'User details fetched successfully!',
          method: 'GET',
          url: '/user',
        });
        authDispatcher(ACTION_TYPES.AUTH.SIGN_IN, {userId: response.data.userId, jwt: response.data.jwt});
        userDispatcher(ACTION_TYPES.USER.FILL_PII, {
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
        });
      } catch (e: any) {
        authDispatcher(ACTION_TYPES.AUTH.SIGN_OUT, undefined);
        userDispatcher(ACTION_TYPES.USER.RESET_PII, undefined);
      }
    })();
  }, [authDispatcher, userDispatcher, history, sendRequest]);

  const loggedInStatusMessage = () => {
    return authState.isSignedIn
      ? `Hi, ${userState.first_name} ${userState.last_name}`
      : 'Unauthenticated user! Not logged in yet!';
  };

  // 'cenceled' error toast occurred on Dashboard load.
  if (error !== 'canceled') {
    toast(error, {
      type: 'error',
      toastId: 'Dashboad-Load',
    });
  }

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && error !== 'canceled' && (
        <ErrorModal onCloseModal={clearErrorHandler} header={'Error!'} content={error} />
      )}
      <div className="ui container">
        <h1>Home Page</h1>
        <h3>{loggedInStatusMessage()}</h3>
      </div>
    </React.Fragment>
  );
}

export default Home;
