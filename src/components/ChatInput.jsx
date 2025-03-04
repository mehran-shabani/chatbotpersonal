import React, { useState } from 'react';
import { Box, TextField, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { AiOutlineSend } from 'react-icons/ai';

const ChatInput = ({ handleSend, loading, aiResponseLoading }) => {
    const [text, setText] = useState('');

    const onSend = () => {
        handleSend(text);
        setText('');
    };

    return (
        <Box component="form" onSubmit={(e) => { e.preventDefault(); onSend(); }} sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box display="flex" alignItems="center">
                <TextField
                    fullWidth
                    placeholder="Type your message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={loading || aiResponseLoading}
                    variant="outlined"
                    sx={{ mr: 1 }}
                    InputProps={{
                        sx: { borderRadius: 4 },
                    }}
                />
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Tooltip title="Send Message">
                        <IconButton
                            color="primary"
                            onClick={onSend}
                            disabled={loading || aiResponseLoading}
                            size="large"
                        >
                            <AiOutlineSend />
                        </IconButton>
                    </Tooltip>
                </motion.div>
            </Box>
        </Box>
    );
};

export default ChatInput;