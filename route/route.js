const express = require('express')
const router = express.Router()

const {createQuestions,getQuestionsByAdmin,updateQuestion,getQuestionsForStudent, getcheckingAnswerIsMatchingOrNot} = require('../controller/controller')
const {createAdmin, loginAdmin} = require('../controller/adminController')
const {adminAuthentication} = require('../middleware/adminAuth')
const {studentAuthentication} = require('../middleware/studentAuth')
router.post('/createAdmin',createAdmin)
router.post('/loginAdmin',loginAdmin)

router.post('/createQuestion',adminAuthentication,createQuestions)
router.get('/getQuestions',adminAuthentication,getQuestionsByAdmin)
router.put('/updateQuestion/:questionId',adminAuthentication,updateQuestion)

// student
router.post('/createStudent',createAdmin)
router.post('/loginStudent',loginAdmin)
router.get('/studentQuestions',studentAuthentication,getQuestionsForStudent)
router.get('/studentQuestions1/:questionId',studentAuthentication,getcheckingAnswerIsMatchingOrNot)

module.exports =router;