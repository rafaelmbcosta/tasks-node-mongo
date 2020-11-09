const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
})

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is Invalid!')
      }
    },
    lowercase: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0
  }
})

const me = new User({
  name: '   Andrew   ',
  email: 'teste@TESTE.com',
})

me.save().then(() => {
  console.log(me)
}).catch((error) => {
  console.log('Error!', error)
})