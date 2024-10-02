import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='555607083776-6fs90i529j70p87bofke42h83hpp913r.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>
);
