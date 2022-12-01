const mongoose = require('mongoose')

const Schema = mongoose.Schema

const diagnosisSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  gen: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Diagnosis', diagnosisSchema)