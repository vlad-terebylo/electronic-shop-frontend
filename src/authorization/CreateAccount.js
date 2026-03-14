import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!login || !password || !repeatPassword) {
            setError('All fields must be filled');
            return;
        }

        if (password !== repeatPassword) {
            setError('Passwords do not match');
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
                <h2 style={{textAlign: 'center'}}>Sign Up</h2>

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

                <input
                    type="password"
                    placeholder="Repeat password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
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

                <button onClick={() => navigate('/login')}
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
                    Already have an account? Sign In
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
                    Create an account
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;