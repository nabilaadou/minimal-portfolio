import React from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const	root = document.getElementById('root');

ReactDom.createRoot(root!).render(<App />);