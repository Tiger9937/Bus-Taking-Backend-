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


export{app}