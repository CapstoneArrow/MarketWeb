import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCsrfToken();
    }, []);

    const fetchCsrfToken = async () => {
        try {
            const response = await fetch('https://tradi-market.site/api/csrf_token/');
            if (response.ok) {
                const data = await response.json();
                setCsrfToken(data.csrfToken);
            } else {
                throw new Error('Failed to fetch CSRF token');
            }
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }

        try {
            const response = await fetch('https://tradi-market.site/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,  // Include CSRF token in the request headers
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Logged in successfully');
                console.log('Logged in:', data);
                navigate('/'); // Redirect to home page or any other page
            } else {
                const errorData = await response.json();
                alert('Login Failed: ' + (errorData.error || 'Invalid credentials'));
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login');
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleLogin}>
                <div className='login__text'>로그인</div>

                <div>
                    <Link to="/">
                        <AiFillHome className="icon" />
                        <span> 홈으로 돌아가기 </span>
                    </Link>
                </div>

                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder='Username' 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <FaLock className="icon" />
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox" />기억하기</label>
                    <a href="#"> 아이디/비밀번호를 잊어버리셨나요?</a>
                </div>

                <button type="submit">로그인하기</button>
            </form>

            <div className="register-link">
                <p>회원이 아닌가요? <Link to="/signup">회원등록</Link></p>
            </div>
        </div>
    );
}

export default LoginForm;
