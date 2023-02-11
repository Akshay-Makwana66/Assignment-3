const awsSdk = require('aws-sdk')
const questionModel = require('../model/questionModel')
const aws = require('./aws-config')

const createQuestions=async (req,res) =>{ 
    try{
        let data=req.body
        let files = req.files;  
        if(files){
           data.media = await aws_config.uploadFile(files[0]);        
        }
        let savedData=await questionModel.create(data)
        res.status(201).send({message:'Question created Successfully',ata:savedData})                 
        }catch(err){   
         res.status(500).send({ message:'Sorry, for the inconvenience caused', msg:err})
        }
 }      
 
 const getQuestionsByAdmin = async  (req, res) => {
    try {  
      let viewQuestions = await questionModel.find();  
      if (viewQuestions.length == 0)return res.status(404).send({ status: false, msg: "No questions found" });  
      res.status(200).send({ message:'List of Questions', data: viewQuestions });
    } catch (error) {
      res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: error.message });
    }
  };

  const updateQuestion = async  (req, res) => {
    try {
      let path = req.params.questionId;
      if (!mongoose.isValidObjectId(path))return res.status(400).send({ status: false, msg: "Please Enter questionId as a valid ObjectId" })
     
      let data = req.body;
      if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty"});
      
      let files = req.files;
    
      if(req.files.length){
          let uploadFileUrl = await aws_config.uploadFile(files[0]);
          data.media = uploadFileUrl;
      }
      //Updating the data
      let updatedQuestion = await questionModel.findOneAndUpdate(
        { _id: question }, data, { new: true } );
  
      if(!updatedQuestion) return res.status(404).send({status:false,msg:"No updatedQuestion found"})
  
      res.status(200).send({ message:'Question Updated Successfully', data: updatedQuestion });
    } catch (error) {
      res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: error.message });
    }
  };

  const getQuestionsForStudent = async  (req, res) =>{
    try {  
      let viewQuestionsForStudent = await questionModel.aggregate( [ { $sample: { size: 10 } } ]);
  
      if (viewQuestionsForStudent.length == 0)return res.status(404).send({ status: false, msg: "No questions found" });
  
      res.status(200).send({message:'List of Questions', data: viewQuestionsForStudent });   
  
    } catch (error) {
      res.status(500).send({message:'Sorry, for the inconvenience caused', msg: error.message });
    }
  };

  const getcheckingAnswerIsMatchingOrNot = async  (req, res) => {
    try {  
        let path = req.params.questionId;
        if (!mongoose.isValidObjectId(path))return res.status(400).send({ status: false, msg: "Please Enter questionId as a valid ObjectId" });

        let findQuestionId = await questionModel.findOne({_id:path})
        
        let checkQueryParams = req.query.studentMark;
        if(checkQueryParams===findQuestionId.mark){
            return res.status(200).send({status:true,msg:"answer is right"})
        }else{
            return res.status(200).send({status:true,msg:"answer is wrong"})
        }
  
    } catch (error) {
      res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: error.message });
    }
  }; 

 module.exports={createQuestions,getQuestionsByAdmin,updateQuestion,getQuestionsForStudent,getcheckingAnswerIsMatchingOrNot}   