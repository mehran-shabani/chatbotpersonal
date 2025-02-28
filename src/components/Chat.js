import {
    Paper,
    Typography,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    Button,
} from '@mui/material';
import { ChatList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import { motion } from 'framer-motion';
import axios from 'axios';
import {useEffect, useState} from "react";

/**
 * یک API سرویس ساده
 * (اگر در پروژه‌تان فایل جداگانه‌ای مثل services/Api.js دارید، اینجا
 * می‌توانید از آن استفاده کنید. اینجا فقط مثالی با axios مستقیم می‌زنیم.)
 */
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

const EnhancedChatComponent = ({ token, user }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
    const [models, setModels] = useState([]);

    // گرفتن لیست مدل‌ها
    const fetchModels = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/models/');
            setModels(response.data);
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };

    // گرفتن لیست پیام‌ها
    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/ai/');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // در بدو ورود، هر 5 ثانیه یکبار پیام‌ها و مدل‌ها را رفرش می‌کنیم
    useEffect(() => {
        // هر چندمیلی‌ثانیه (اینجا 5 ثانیه) یکبار پیام‌ها را بگیر
        const messagesIntervalId = setInterval(fetchMessages, 5000);
        // هر 5 ثانیه یکبار مدل‌ها را بگیر
        const modelsIntervalId = setInterval(fetchModels, 5000);

        // فراخوانی اولیه برای اینکه منتظر 5 ثانیه نشویم
        fetchMessages();
        fetchModels();

        // پاک کردن interval ها
        return () => {
            clearInterval(messagesIntervalId);
            clearInterval(modelsIntervalId);
        };
    }, []);

    // ساختن مکالمه از تمام پیام‌های قبلی به صورت متن پشت سر هم
    const buildConversation = (msgs) => {
        let conversationString = '';
        msgs.forEach((msg) => {
            // می‌توانید فرمت دلخواهتان را تنظیم کنید
            // مثلاً:
            // conversationString += `User: ${msg.text}\nAI: ${msg.response}\n`;
            // یا در صورت ساده‌تر:
            conversationString += `${msg.text}\n${msg.response}\n`;
        });
        return conversationString;
    };

    // ارسال پیام به سرور
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        // 1) رشتهٔ کل مکالمهٔ قبلی
        const conversationString = buildConversation(messages);

        // 2) انتهای مکالمهٔ قبلی، متن جدید کاربر
        const finalTextToSend = `${conversationString}${text}`;

        try {
            // 3) ارسال به سرور
            //  نکته: مسیر شما /api/ai/ است:
            await api.post(
                '/ai/',
                {
                    text: finalTextToSend, // اینجا رشتهٔ کامل مکالمه را ارسال می‌کنیم
                    model: selectedModel,
                    token: token,
                }
            );

            // 4) پاک کردن فیلد تکست
            setText('');

            // 5) بلافاصله پس از ارسال، مجدداً پیام‌ها را از سرور بگیریم
            await fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    /**
     * پیاده‌سازی دو پیام در چت برای هر رکورد:
     *  - پیام کاربر: (msg.text)
     *  - پیام AI: (msg.response) با نمایش اسم مدل در title
     *
     * در نهایت به صورت آرایه‌ای از آیتم‌ها در ChatList برمی‌گردد.
     */
    const chatItems = messages.flatMap((msg) => {
        // اگر بخواهید فقط یک آیتم در ChatList داشته باشید و subtitle شامل
        // متن کاربر + متن ریسپانس باشد، می‌توانید به شکل قبلی عمل کنید.
        // اما اینجا برای زیبایی دو آیتم ایجاد می‌کنیم.
        const userItem = {
            avatar: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png', // آواتار کاربر
            title: msg.user || 'User', // یا اگر بخواهیم کاربر را نشان دهیم
            subtitle: msg.text,
            date: new Date(msg.created_at),
            dateString: new Date(msg.created_at).toLocaleString(),
        };

        const aiItem = {
            avatar: 'https://cdn-icons-png.flaticon.com/512/4712/4712027.png', // آواتار AI
            title: msg.model_display || msg.model, // نمایش مدل به شکلی زیبا
            subtitle: msg.response,
            date: new Date(msg.created_at),
            dateString: new Date(msg.created_at).toLocaleString(),
        };

        return [userItem, aiItem];
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4"
        >
            <Paper className="p-4 mb-4 shadow-lg rounded-2xl">
                <Typography variant="h5" gutterBottom>
                    Welcome, {user?.username || 'User'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Enter your message"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            multiline
                            rows={3}
                            variant="outlined"
                            required
                        />

                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="model-select-label">Select Model</InputLabel>
                            <Select
                                labelId="model-select-label"
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                label="Select Model"
                            >
                                {models.map((modelObj, index) => (
                                    <MenuItem key={index} value={modelObj.model}>
                                        {modelObj.description}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className="rounded-2xl shadow-md"
                        >
                            Send Message
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Paper className="p-4 shadow-lg rounded-2xl">
                <Typography variant="h6" gutterBottom>
                    Chat History
                </Typography>
                <ChatList className="chat-list" dataSource={chatItems} />
            </Paper>
        </motion.div>
    );
};

export default EnhancedChatComponent;