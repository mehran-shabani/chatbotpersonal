import React, { useState, useEffect } from 'react';
import { Box, Paper, ThemeProvider, CssBaseline, Container } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchModels, sendMessage, createBubbleData } from './chatUtils';
import { useTheme } from './chatStyles';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ModelInfo from './ModelInfo';

const Chat = ({ username }) => {
    const [messages, setMessages] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedModelIndex, setSelectedModelIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isDarkMode] = useState(false);
    const [aiResponseLoading, setAiResponseLoading] = useState(false);

    const { theme, toggleDarkMode } = useTheme(isDarkMode);

    useEffect(() => {
        fetchModels(setLoading, setModels, setSelectedModelIndex);
    }, []);

    const handleSend = async (text) => {
        if (!text.trim() || models.length === 0) return;
        const selectedModel = models[selectedModelIndex]?.model;
        await sendMessage(text, selectedModel, username, setMessages, setAiResponseLoading);
    };

    const bubbleData = createBubbleData(messages);
    

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Paper elevation={6} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                            <Box display="flex" flexDirection="column" height="80vh">
                                <ChatHeader
                                    isDarkMode={isDarkMode}
                                    toggleDarkMode={toggleDarkMode}
                                    models={models}
                                    selectedModelIndex={selectedModelIndex}
                                    setSelectedModelIndex={setSelectedModelIndex}
                                />
                                <ChatMessages
                                    bubbleData={bubbleData}
                                    aiResponseLoading={aiResponseLoading}
                                />
                                <ChatInput
                                    handleSend={handleSend}
                                    loading={loading}
                                    aiResponseLoading={aiResponseLoading}
                                />
                                <ModelInfo
                                    model={models[selectedModelIndex]}
                                />
                            </Box>
                        </Paper>
                    </motion.div>
                </AnimatePresence>
            </Container>
        </ThemeProvider>
    );
};

export default Chat;