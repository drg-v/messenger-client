import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CreateUser from './components/create-user.js'
import EditUser from './components/edit-user.js'
import Chat from './components/chat.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create" element={<CreateUser />} />
      <Route path="/edit/:userId" element={<EditUser />} />
      <Route path="/chat/:userId" element={<Chat />} />
    </Routes>
  </BrowserRouter>
);
