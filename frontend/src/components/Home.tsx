import axios from 'axios';
import React, {useState, useEffect} from 'react';

function Home() {
  const [loggedInStatusMessage, setLoggedInStatusMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/user');
        const user = response.data;
        setLoggedInStatusMessage(`Hi, ${user.first_name} ${user.last_name}`);
      } catch (e) {
        setLoggedInStatusMessage('Unauthenticated user! Not logged in yet!');
      }
    })();
  }, []);

  return (
    <div className="ui container">
      <h1>Home Page</h1>
      <h3>{loggedInStatusMessage}</h3>
    </div>
  );
}

export default Home;
