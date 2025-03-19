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
import ProjectRoute from './router/project.rout.js'
import LikeRout from './router/likes.rout.js'
import Notification from './router/notification.rout.js'
import RatingRouter from './router/Rating.rout.js'
import EXPTest from './router/experiment.rout.js'
import TechRouter from './router/technology.rout.js'

// StudentRout
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/student', StudentRout);
app.use('/api/v1/collage', CollageRoute);
app.use('/api/v1/faculty', FacultyRoute);
app.use('/api/v1/flow', Flowrouter);
app.use('/api/v1/midia' , SocialMidiaRoute);
app.use('/api/v1/comment' , CommentRoute);
app.use('/api/v1/Project' , ProjectRoute);
app.use('/api/v1/Likes',LikeRout);
app.use('/api/v1/notify',Notification)
app.use('/api/v1/Rating',RatingRouter)
app.use('/api/v1/EXP',EXPTest)
app.use('/api/v1/TechRouter',TechRouter)

export { app };
