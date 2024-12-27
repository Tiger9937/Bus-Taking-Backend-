import {Router} from 'express'
import { CreateComment , removedComment , AccessParticulaeComment , UpdateParticularComment } from '../controler/Commend.controler.js'

const CommentRoute = Router()

CommentRoute.route("/CreateComment").post(CreateComment)
CommentRoute.route("/removedComment").get(removedComment)
// CommentRoute.route("/AccessAllComments").get(AccessAllComments)
CommentRoute.route("/AccessParticulaeComment").get(AccessParticulaeComment)
CommentRoute.route("/UpdateParticularComment").get(UpdateParticularComment)

export default CommentRoute