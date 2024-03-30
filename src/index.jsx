import React from 'react';
import App from './App';
import { createRoot, hydrateRoot } from 'react-dom/client';

const container = document.getElementById('root');
if (container.hasChildNodes()) {
    hydrateRoot(container, <App />);
} else {
    createRoot(container).render(<App />);
}