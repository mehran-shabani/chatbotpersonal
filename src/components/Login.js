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
            localStorage.setItem('user', username);
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
                background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
                p: 2,
            }}
        >
            {/* انیمیشن ظاهر شدن فرم */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <Paper
                    elevation={10}
                    sx={{
                        padding: 4,
                        maxWidth: 400,
                        margin: 'auto',
                        borderRadius: 4,
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: '#fff',
                            textShadow: '0px 2px 10px rgba(255, 255, 255, 0.8)',
                            mb: 2,
                        }}
                    >
                        🚀 Welcome Back!
                    </Typography>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <form onSubmit={handleSubmit}>
                            <Box mb={2}>
                                <TextField
                                    label="Username"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    sx={{
                                        input: { color: '#fff' },
                                        label: { color: '#ddd' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                                            '&:hover fieldset': { borderColor: '#fff' },
                                            '&.Mui-focused fieldset': { borderColor: '#fff' },
                                        },
                                    }}
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
                                    sx={{
                                        input: { color: '#fff' },
                                        label: { color: '#ddd' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                                            '&:hover fieldset': { borderColor: '#fff' },
                                            '&.Mui-focused fieldset': { borderColor: '#fff' },
                                        },
                                    }}
                                />
                            </Box>

                            {error && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#ff4d4d',
                                        textAlign: 'center',
                                        mb: 2,
                                    }}
                                >
                                    {error}
                                </Typography>
                            )}

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    disabled={loading}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 1.5,
                                        fontSize: '1.1rem',
                                        borderRadius: 2,
                                        background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #2575fc, #6a11cb)',
                                        },
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                                            Logging in...
                                        </>
                                    ) : (
                                        'Login'
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default Login;
