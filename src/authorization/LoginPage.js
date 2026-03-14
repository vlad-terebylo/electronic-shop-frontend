import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!login || !password) {
            setError('Please enter both login and password');
            return;
        }

        setError(null);

        alert(`Login: ${login}\nPassword: ${password}`);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    width: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                }}
            >
                <h2 style={{textAlign: 'center'}}>Sign In</h2>

                <input
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    style={{padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                />

                {error && <p style={{color: 'red', fontSize: '14px'}}>{error}</p>}
                <button onClick={() => navigate('/')}
                        style={{
                            textAlign: 'center',
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: '#2d89ef',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                    Back to main page
                </button>
                <button onClick={() => navigate('/admin')}
                        type="submit"
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                >
                    Sign In
                </button>

                <p style={{textAlign: 'center', fontSize: '12px', color: '#888'}}>
                    Don't have an account? <a href="/signUp">Register</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;