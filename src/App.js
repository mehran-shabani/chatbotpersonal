import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
                <Route path="/chat" element={<Chat token={token} user={user} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
