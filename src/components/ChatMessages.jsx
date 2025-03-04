import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { MessageList } from 'react-chat-elements';
import { motion, AnimatePresence } from 'framer-motion';

const ChatMessages = ({ bubbleData, aiResponseLoading }) => {
    return (
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            <MessageList
                className="message-list"
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={bubbleData}
             />
            <AnimatePresence>
                {aiResponseLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                            <CircularProgress size={20} sx={{ mr: 1 }} />
                            <Typography variant="body2">AI is thinking...</Typography>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default ChatMessages;