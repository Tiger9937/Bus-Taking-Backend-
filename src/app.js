import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// Define your whitelist of allowed origins
const whitelist = ['http://localhost:5173'];

const corsOptions = {
    origin: (origin, callback) => {
        // Check if the origin is in the whitelist or if there's no origin (for non-browser requests like Postman)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials (cookies, auth headers)
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import and use the user router
import UserRouter from './router/user.rout.js';
import StudentRout from './router/student.rout.js'

app.use('/api/v1/users', UserRouter,StudentRout);
app.use('/api/v1/student', StudentRout);

export { app };
