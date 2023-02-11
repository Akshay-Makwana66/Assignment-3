const express = require('express')
const router = express.Router()

const {createQuestions,getQuestionsByAdmin,updateQuestion,getQuestionsForStudent, getcheckingAnswerIsMatchingOrNot} = require('../controller/controller')
const {createAdmin, loginAdmin} = require('../controller/adminController');
const {createStudent, loginStudent} = require('../controller/studentController')
const {adminAuthentication} = require('../middleware/adminAuth')
const {studentAuthentication} = require('../middleware/studentAuth')
const {adminValidation,adminLoginValidations} = require('../validations/adminValidation')
const {studentValidations,studentLoginValidations} = require('../validations/studentValidations')
const {questionsValidations} = require('../validations/questionValidations')
// admin api-------------
router.post('/createAdmin',adminValidation,createAdmin)
router.post('/loginAdmin',adminLoginValidations,loginAdmin)

router.post('/createQuestion',adminAuthentication,questionsValidations,createQuestions)
router.get('/getQuestions',adminAuthentication,getQuestionsByAdmin)
router.put('/updateQuestion/:questionId',adminAuthentication,updateQuestion)

// student api----------
router.post('/createStudent',studentValidations,createStudent)
router.post('/loginStudent',studentLoginValidations,loginStudent)

router.get('/studentQuestions',studentAuthentication,getQuestionsForStudent)
router.get('/checkStudentAnswer/:questionId',studentAuthentication,getcheckingAnswerIsMatchingOrNot)

module.exports =router;