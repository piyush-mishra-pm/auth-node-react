import React from 'react';

function Home() {
  // todo: add user details (removed from earlier)
  const loggedInUser = {first_name: 'Dummy', last_name: 'User'};
  const loggedInStatusMessage = loggedInUser
    ? `Hi, ${loggedInUser.first_name} ${loggedInUser.last_name}`
    : 'Unauthenticated user! Not logged in yet!';

  return (
    <div className="ui container">
      <h1>Home Page</h1>
      <h3>{loggedInStatusMessage}</h3>
    </div>
  );
}

export default Home;
