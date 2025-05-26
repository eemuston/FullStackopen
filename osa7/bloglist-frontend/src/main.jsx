import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { NotificationContextProvider } from './NotificationContext';
import { UserContextProvider } from './UserContext';
import { BrowserRouter as Router } from 'react-router-dom';
import './main.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </NotificationContextProvider>
  </UserContextProvider>
);
