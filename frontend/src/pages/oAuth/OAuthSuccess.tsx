import React from 'react';
import {useParams, useHistory} from 'react-router-dom';

function OAuthSuccess() {
  const {token} = useParams<{token: string}>();
  const history = useHistory();
  history.push('/');

  return (
    <div>
      <h2 className="ui center aligned icon header">
        <i className="circular positive bug icon"></i>
        oAuth Successful!
      </h2>
      <div className="ui center aligned container">
        <p className="ui warning message">Successful oAuth. Your jwt token is</p>
        <pre>{token}</pre>
      </div>
    </div>
  );
}

export default OAuthSuccess;
