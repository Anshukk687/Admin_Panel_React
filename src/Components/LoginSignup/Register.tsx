import React, { HtmlHTMLAttributes, useState, useEffect } from 'react'
import './LoginSignup.css';
import Icon, { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Await, Link, useNavigate } from 'react-router-dom';

const LoginSignup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            navigate("/dashboard");
        }
    },[])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const userData = {
            name,
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if(response.ok){
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.message || 'Registration Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login'>
            <div className='container'>
                <div className='header'>
                    <div className='text'>Sign Up</div>
                    <div className='underline'></div>
                </div>
                <form onSubmit={handleSubmit} className='inputs'>
                    <div className='input'>
                        <UserOutlined />
                        <input type='text' placeholder='Enter Name' name='name' value={name} onChange={handleInputChange} />
                    </div>
                    <div className='input'>
                        <MailOutlined />
                        <input type='email' placeholder='Enter Email' name='email' value={email} onChange={handleInputChange} />
                    </div>
                    <div className='input'>
                        <LockOutlined />
                        <input type='password' placeholder='Enter Password' name='password' value={password} onChange={handleInputChange} />
                    </div>
                    <div className='forgot-password'>Already have an account ? <Link to="/login">Login here</Link></div>
                    
                    {error && <div className='error'>{error}</div>}
                    <div className='submit-container'>
                        <button type='submit' className='submit' disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginSignup;