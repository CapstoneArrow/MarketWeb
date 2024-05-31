import React, { useState } from 'react';
import './SignUp.css'; // CSS 파일 임포트

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  // 입력 필드의 변화를 처리하는 함수
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 폼 제출 처리
  const handleSubmit = async (event) => {
    event.preventDefault();
    // 회원가입 요청을 여기에서 처리하세요.
    console.log(formData);
    // 예시로 formData를 콘솔에 출력합니다.
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="아이디"
            className="signup-input"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            className="signup-input"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="이메일"
            className="signup-input"
            value={formData.email}
            onChange={handleChange}
          />
          <button type="submit" className="signup-button">
            회원가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
