const express = require('express')
const {
  createDiagnosis,
  getAllDiagnosis,
  getDiagnosis,
  deleteDiagnosis,
  updateDiagnosis
} = require('../controllers/diagnosisController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all diagnosis routes
router.use(requireAuth)

// GET all diagnosis
router.get('/', getAllDiagnosis)

//GET a single diagnosis
router.get('/:id', getDiagnosis)

// POST a new diagnosis
router.post('/', createDiagnosis)

// DELETE a diagnosis
router.delete('/:id', deleteDiagnosis)

// UPDATE a diagnosis
router.patch('/:id', updateDiagnosis)


module.exports = router