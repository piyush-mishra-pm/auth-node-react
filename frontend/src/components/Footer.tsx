import React from 'react';

function Footer() {
  return (
    <div>
      <p className="ui warning message">
        As server might be dormant, first API request (google-oAuth or Login/Register button) might take upto 1 minute
        to serve. Then onwards it should work at faster speeds.
        <br />
        Your VPN could be causing CORS errors for certain routes.
        <br />
        If you generated password recovery mail, then check your SPAM folder too.
      </p>
    </div>
  );
}

export default Footer;
