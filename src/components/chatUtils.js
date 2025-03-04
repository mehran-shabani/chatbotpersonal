import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://chatbot.medogram.ir/api',
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export const fetchModels = async (setLoading, setModels, setSelectedModelIndex) => {
    try {
        setLoading(true);
        const response = await api.get('/models/');
        setModels(response.data);
        if (response.data.length > 0) {
            setSelectedModelIndex(0);
        }
    } catch (error) {
        console.error('Error fetching models:', error);
    } finally {
        setLoading(false);
    }
};

export const sendMessage = async (text, selectedModel, username, setMessages, setAiResponseLoading) => {
    const newMessage = {
        username: username || 'User',
        text,
        model: selectedModel,
        created_at: new Date().toISOString(),
    };
    setMessages(prev => Array.isArray(prev) ? [...prev, { ...newMessage, response: 'Loading...' }] : [{ ...newMessage, response: 'Loading...' }]);
    try {
        const response = await api.post('/ai/', {
            text,
            model: selectedModel,
        });
        const aiResponse = response.data?.response || '(No AI response)';
        setMessages(prev => Array.isArray(prev) ? prev.map(msg => msg.text === text && msg.username === newMessage.username ? { ...msg, response: aiResponse } : msg) : []);
    } catch (error) {
        console.error('Error sending message:', error);
    } finally {
        setAiResponseLoading(false);
    }
};

export const createBubbleData = (messages) => {
    return messages.flatMap(msg => {
        const userBubble = {
            position: 'right',
            type: 'text',
            text: msg.text,
            title: msg.username || 'User',
            date: new Date(msg.created_at),
        };
        const aiBubble = {
            position: 'left',
            type: 'text',
            text: msg.response,
            title: msg.model_display || msg.model || 'AI',
            date: new Date(msg.created_at),
        };
        return [userBubble, aiBubble];
    });
};