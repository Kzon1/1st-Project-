import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import "react-quill/dist/quill.snow.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "react-toastify/dist/ReactToastify.css";
const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Provider store={store}><App /></Provider>);
