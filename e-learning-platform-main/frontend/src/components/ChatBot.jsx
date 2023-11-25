import { useState } from "react";

export default function ChatBot() {
    const [response, setResponse] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const message = formData.get('message');
        fetch(`http://${import.meta.env.BACKEND_URL || 'localhost:5000'}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    setResponse(data.response);
                } else {
                    alert(data.error);
                }
            })
            .catch(() => {
                alert('Error. Chatbot is not available. Please try again later.');
            });
    }

    return (
        <div style={{ textAlign: 'center', margin: '50px auto', maxWidth: '400px' }}>
            <h1 style={{ color: '#333' }}>ChatBot</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                    type="text"
                    name="message"
                    style={{ padding: '8px', margin: '10px 0', width: '80%', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '8px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Send
                </button>
            </form>
            <p style={{ marginTop: '20px', color: '#666', fontStyle: 'italic' }}>{response}</p>
        </div>
    );
}
