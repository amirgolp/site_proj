const Diagnosis = require('../models/diagnosisModel')
const mongoose = require('mongoose')
const { aggregate } = require('../models/diagnosisModel')

// get all diagnosis
const getAllDiagnosis = async (req, res) => {
  const user_id = req.user._id

  const diagnosis = await Diagnosis.find({user_id}).sort({createdAt: -1})

  res.status(200).json(diagnosis)
}

// get a single diagnosis
const getDiagnosis = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such diagnosis'})
  }

  const diagnosis = await Diagnosis.findById(id)

  if (!diagnosis) {
    return res.status(404).json({error: 'No such diagnosis'})
  }
  
  res.status(200).json(diagnosis)
}


// create new diagnosis
const createDiagnosis = async (req, res) => {
  const {title, age, gen} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!age) {
    emptyFields.push('age')
  }
  if(!gen) {
    emptyFields.push('gen')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const diagnosis = await Diagnosis.create({title, age, gen, user_id})
    res.status(200).json(diagnosis)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a diagnosis
const deleteDiagnosis = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such diagnosis'})
  }

  const diagnosis = await Diagnosis.findOneAndDelete({_id: id})

  if (!diagnosis) {
    return res.status(400).json({error: 'No such diagnosis'})
  }

  res.status(200).json(diagnosis)
}

// update a diagnosis
const updateDiagnosis = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such diagnosis'})
  }

  const diagnosis = await Diagnosis.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!diagnosis) {
    return res.status(400).json({error: 'No such diagnosis'})
  }

  res.status(200).json(diagnosis)
}


module.exports = {
  getAllDiagnosis,
  getDiagnosis,
  createDiagnosis,
  deleteDiagnosis,
  updateDiagnosis
}