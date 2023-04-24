import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes'
import errorHandler from './middleware/errorHandler'
import models from './models'


const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(async(req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('Conrad P.B'),
  }
  next()
})
app.use('/session', routes.session)
app.use('/users', routes.user)
app.use('/questions', routes.question)
app.use('/answers', routes.answer)
app.use('/qna', routes.QnA)
app.use(errorHandler)


export default app