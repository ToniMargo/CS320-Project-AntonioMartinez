import {useEffect, useState} from 'react';
import {API_URL} from "../config";

function AppOld() {
  const [message, setMessage] = useState('');

  useEffect(()=> {
    const fetchMessage = async () => {
      const response = await fetch(`${API_URL}/hello/personalized`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({first: 'Ensign', last: 'Student'})
      });
      const text = await response.text();
      setMessage(text);
    };
    fetchMessage();
  }, []);

    return (
      <div>
        <h1>Message from the backend:</h1>
        <p>{message}</p>
      </div>
    );
}

export default AppOld;
