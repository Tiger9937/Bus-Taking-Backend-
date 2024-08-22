import express from 'express';
import cookie from 'cookie-parser';
import cors from 'cors';

const app = express()
app.use(cors({
    origin: process.env.CORSE_origin,
    Credential : true
}))

app.use(
    express.json({limit : "16kb"})
)
app.use(
    express.urlencoded({extended : true, limit:"16kb"})
)
app.use(
    express.static("public")
)
app.use(
    cookie()
)

// user router🚁
import UserRouter  from './router/user.rout.js';

app.use('/api/v1/users',UserRouter)

// localhost:8000/api/v1/users/regidter
export{app}