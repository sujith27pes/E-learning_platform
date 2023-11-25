import TopicsPage from './components/TopicsPage.jsx'
import Topic from './components/Topic.jsx';
import LoginPage from './components/LoginPage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <LoginPage />},
  { path: '/topics', element: <TopicsPage /> },
  { path: '/topic/:topicName', element: <Topic /> },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;