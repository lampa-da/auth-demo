const express = require('express');
const app = express();
const { models: { User }} = require('./db')
const path = require('path')

module.exports = app

app.use(express.json())

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')))

app.post('/api/auth', async(req, res, next) => {
  try{
    res.send({token: await User.authenticate(req.body)})
  }
  catch(ex){
    next(ex)
  }
})

app.get('/api/auth', async(req, res, next) => {
  try{
    res.send(await User.byToken(req.headers.authorization))
  }
  catch(ex){
    next(ex)
  }
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message })
})