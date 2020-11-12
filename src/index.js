const express = require('express')
// const { ObjectID } from ''
const mongoose = require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000
// parse income JSON to object
app.use(express.json())

app.post('/tasks', (req, res) => {
  const task = new Task(req.body)
  task.save().then(() => {
    res.status(201)
    res.send(task)
  }).catch(e => {
    res.status(400).send(e)
  })
})

app.post('/users', (req, res) => {
  const user = new User(req.body)

  user.save().then(() => {
    res.status(201).send(user)
  }).catch(e => {
    res.status(400).send(e)
  })
  // console.log(req.body)
  // res.send('testing !')
})

app.get('/users', (_req, res) => {
  User.find({}).then(users => {
    res.send(users)
  }).catch(error => {
    res.status(500).send(error)
  })
})

app.get('/users/:id', (req, res) => {
  const _id = req.params.id
  User.findById(_id).then(user => {
    if(!user) {
      return res.status(404).send()
    }
    res.status(200).send(user)
  }).catch(error => {

    console.log(error)
    res.status(500).send(error)
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + 3000)
})