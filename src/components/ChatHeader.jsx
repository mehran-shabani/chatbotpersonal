import React, { useState } from 'react';
import { Typography, Box, IconButton, Tooltip, Menu, MenuItem, Fade } from '@mui/material';
import { motion } from 'framer-motion';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { FiSun, FiMoon } from 'react-icons/fi';

const ChatHeader = ({ isDarkMode, toggleDarkMode, models, selectedModelIndex, setSelectedModelIndex }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleModelSelect = (index) => {
        setSelectedModelIndex(index);
        handleMenuClose();
    };

    return (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Typography variant="h4"color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <GiArtificialIntelligence style={{ marginRight: '8px' }} />
                        AI Chat
                    </Typography>
                </motion.div>
                <Box display="flex" alignItems="center">
                    <Tooltip title="Select AI Model">
                        <IconButton onClick={handleMenuClick} color="primary">
                            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                                <GiArtificialIntelligence />
                            </motion.div>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                        <IconButton onClick={toggleDarkMode} color="primary">
                            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                                {isDarkMode ? <FiSun /> : <FiMoon />}
                            </motion.div>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                TransitionComponent={Fade}
            >
                {models.map((model, index) => (
                    <MenuItem key={index} onClick={() => handleModelSelect(index)}>
                        {model.description || model.model}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default ChatHeader;