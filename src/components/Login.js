import React, { useState } from 'react';
import {
    TextField,
    Button,
    Paper,
    Typography,
    Box,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Login = ({ setToken, setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/login/',
                { username, password }
            );

            const token = response.data.token;


            setToken(token);
            setUser(username);
            localStorage.setItem('token', token);
            localStorage.setItem('user', (username));
            navigate('/chat');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // گرادینت پس‌زمینه
                background: 'linear-gradient(to right, #ff9966, #ff5e62)',
                p: 2,
            }}
        >
            {/* انیمیشن نمایان شدن کارت لاگین */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        padding: 4,
                        maxWidth: 400,
                        margin: 'auto',
                        borderRadius: 3,
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <TextField
                                label="Username"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Box>
                        {error && (
                            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            disabled={loading}
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            {loading ? (
                                <>
                                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </form>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default Login;
