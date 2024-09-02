import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import NavigationProvider from './context/NavigationProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <NavigationProvider>
            <App />
        </NavigationProvider>
    </StrictMode>
);
