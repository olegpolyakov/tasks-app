import { createRoot } from 'react-dom/client';

import App from './app';

import 'kantanui/styles';

import './index.scss';

createRoot(document.getElementById('root')!).render(
    <App />
);