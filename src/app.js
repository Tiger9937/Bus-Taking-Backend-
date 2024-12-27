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
import CollageRoute from './router/collage.rout.js'
import FacultyRoute from './router/Faculty.rout.js'
import Flowrouter from './router/flow.rout.js'
import SocialMidiaRoute from './router/SocialMidia.rout.js'
import CommentRoute from './router/comment.route.js'
// StudentRout
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/student', StudentRout);
app.use('/api/v1/collage', CollageRoute);
app.use('/api/v1/faculty', FacultyRoute);
app.use('/api/v1/flow', Flowrouter);
app.use('/api/v1/midia' , SocialMidiaRoute);
app.use('/api/v1/midia' , CommentRoute);

export { app };
