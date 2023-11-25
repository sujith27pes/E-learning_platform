import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import VideoPlayer from './VideoPlayer.jsx';
import ChatBot from './ChatBot.jsx';

const TopicPage = () => {
  const [topic, setTopic] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { topicName } = useParams();

  useEffect(() => {
    fetch(`http://${import.meta.env.BACKEND_URL || 'localhost:5000'}/api/topic/${topicName}`)
      .then((resp) => resp.json())
      .then((response) => {
        setTopic(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching topic:', error);
      });
  }, [topicName]);

  if (isLoading) {
    return <p style={{ textAlign: 'center', margin: '50px auto', color: '#666', fontSize: '18px' }}>Loading...</p>;
  }

  return (
    <div style={{ textAlign: 'center', margin: '50px auto', maxWidth: '800px' }}>
      <h1 style={{ color: '#333', fontSize: '32px', marginBottom: '20px' }}>{topic.name}</h1>
      <VideoPlayer url={topic.url} />
      <ChatBot />
    </div>
  );
};

export default TopicPage;


