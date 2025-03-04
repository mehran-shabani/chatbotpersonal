import React, { useState } from 'react';
import {
    TextField,
    Button,
    Paper,
    Typography,
    Box,
    CircularProgress,
    Snackbar,
    IconButton,
    Backdrop
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { motion } from 'framer-motion';

const Login = ({token}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setUsername(username.trim());
        localStorage.setItem('username', username);
        const requestData = qs.stringify({
            
            username: username,
            password: password,
            
        });

        try {
            const response = await axios.post(
                'https://chatbot.medogram.ir/api/login/',
                requestData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }
            );

            if (response.status === 200) {
                token = response.data.token;
                localStorage.setItem('token', token);
                
                setLoading(false);
                navigate('/Chat');
            } else {
                setError('Invalid credentials. Please try again.');
                setSnackbarOpen(true);
                setLoading(false);
            }
        } catch (error) {
            setError('Invalid credentials. Please try again.');
            console.error(error);
            setSnackbarOpen(true);
            setLoading(false);
        }
    };
    

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to right, #141e30, #243b55)',
                p: 2,
                position: 'relative',
            }}
        >
            <Backdrop open={loading} sx={{ color: '#fff', zIndex: 999 }}>
                <CircularProgress color="inherit" />
            </Backdrop>

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
                                    type="username"
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
                                        background: 'linear-gradient(45deg, #ff9966, #ff5e62)',
                                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #ff5e62, #ff9966)',
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

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                message={error}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleSnackbarClose}
                    >
                        ✖
                    </IconButton>
                }
                sx={{
                    '& .MuiSnackbarContent-root': {
                        backgroundColor: '#ff4d4d',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                    },
                }}
            />
        </Box>
    );
};

export default Login;