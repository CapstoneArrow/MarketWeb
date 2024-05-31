import React, { useState } from 'react';
import axios from 'axios';

function FindPassword() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleFindPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/find-password', inputs);
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
      <h1>비밀번호 찾기</h1>
      <form onSubmit={handleFindPassword}>
        <label>
          아이디:
          <input
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          이메일:
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">비밀번호 찾기</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FindPassword;
