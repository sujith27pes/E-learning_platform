import React, { useState, useEffect } from 'react';

const TopicPage = ({ match }) => {
    const [topic, setTopic] = useState(null);

    useEffect(() => {
        // Fetch individual topic from the backend
        fetch(`http://${import.meta.env.BACKEND_URL || 'localhost:5000'}/api/topics/${match.params.topicId}`)
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    setTopic(data.topic);
                } else {
                    console.error('Error fetching individual topic');
                }
            })
            .catch(() => {
                console.error('Error fetching individual topic');
            });
    }, [match.params.topicId]);

    return (
        <div style={{ textAlign: 'center', margin: '50px auto', maxWidth: '600px' }}>
            {topic ? (
                <>
                    <h1 style={{ color: '#333' }}>{topic.title}</h1>
                    <p style={{ color: '#666', marginBottom: '20px' }}>{topic.description}</p>
                    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                        <h2 style={{ color: '#4CAF50' }}>Details</h2>
                        <p style={{ color: '#333' }}>{topic.details}</p>
                    </div>
                </>
            ) : (
                <p style={{ color: '#666' }}>Loading topic...</p>
            )}
        </div>
    );
};

export default TopicPage;
