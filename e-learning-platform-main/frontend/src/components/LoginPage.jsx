import { useState } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        // Make a request to the backend to authenticate the user
        fetch(`http://${import.meta.env.BACKEND_URL || 'localhost:5000'}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
            .then(async (response) => {
                // Check if the response is 404 (not found)
                const data = await response.json();

                if (response.ok) {
                    window.location.href = '/topics';
                } else {
                    alert(data.message);
                }
            })
            .catch(() => {
                alert('Error logging in. Please try again later.');
            });
    };

    return (
        <div style={{ textAlign: 'center', margin: '50px auto', maxWidth: '400px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px' }}>
            <img
                src="/mindmingle.jpg" // Update with the actual file name of your image
                alt="Login Image"
                style={{ width: '100%', marginBottom: '20px', borderRadius: '8px' }}
            />
            <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '24px' }}>Login</h1>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px', color: '#333' }}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px', color: '#333' }}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;


