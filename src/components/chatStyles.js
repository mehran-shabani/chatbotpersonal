import { createTheme } from '@mui/material';
import { useState, useMemo } from 'react';

export const useTheme = (isDarkMode) => {
    const [mode, setMode] = useState(isDarkMode ? 'dark' : 'light');

    const toggleDarkMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: mode === 'dark' ? '#BB86FC' : '#6200EE',
                    },
                    secondary: {
                        main: mode === 'dark' ? '#03DAC6' : '#03DAC6',
                    },
                    background: {
                        default: mode === 'dark' ? '#121212' : '#F5F5F5',
                        paper: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
                    },
                },
                typography: {
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    h4: {
                        fontWeight: 700,
                    },
                },
                shape: {
                    borderRadius: 12,
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                textTransform: 'none',
                            },
                        },
                    },
                },
            }),
        [mode]
    );

    return { theme, toggleDarkMode };
};