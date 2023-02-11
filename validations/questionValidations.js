const questionModel = require('../model/questionModel');

const questionsValidations = async (req,res) =>{
          try{
            let data = req.body;
            let {question,option1,option2,option3,option4,mark} = data;
            if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty"});

            if(!question) return res.status(400).send({ status: false, msg: "Please enter question"});
            if(!option1) return res.status(400).send({ status: false, msg: "Please enter option1"});
            if(!option2) return res.status(400).send({ status: false, msg: "Please enter option2"});
            if(!option3) return res.status(400).send({ status: false, msg: "Please enter option3"});
            if(!option4) return res.status(400).send({ status: false, msg: "Please enter option4"});
            if(!mark) return res.status(400).send({ status: false, msg: "Please enter mark"});

          }catch(err){
            res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: err.message });
          }
};

module.exports = {questionsValidations}