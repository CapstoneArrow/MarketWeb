import React, { useState } from 'react';
import axios from 'axios';

function FindUsername() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFindUsername = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/find-username', { email });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('서버와의 통신에 실패했습니다.');
      }
    }
  };

  return (
    <div>
      <h1>아이디 찾기</h1>
      <form onSubmit={handleFindUsername}>
        <label>
          이메일:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">아이디 찾기</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FindUsername;
