const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt')
const studentModel = require('../model/studentModel')
const saltRounds = 10;

// Student Registration API -
const createStudent = async function (req, res) {                   
              try {
                let data= req.body;   
                data.password = await bcrypt.hash(data.password, saltRounds);
                let savedData = await studentModel.create(data);  
                res.status(201).send({message:'Your Registration Is Done Successfully', data: savedData });
              } catch (err) {
                res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: err.message });
              }
};

// Student Login API -
const loginStudent= async function(req,res){
              try{
                let data = req.body;

                let userEmail= data.email;   
                let userPassword= data.password;

                let checkCred= await studentModel.findOne({email: userEmail})
                if(!checkCred) return res.status(401).send({status:false, msg:"Email is incorrect"})
                let decryptPassword =  bcrypt.compare(userPassword, checkCred.password);

                if (!decryptPassword) {  
                  return res.status(401).send({ status: false, message: "Password is not correct" });
                }

                //Creating token if e-mail and password is correct
                let token= jwt.sign({
                  userId: checkCred._id.toString(),
                }, "STUDENT");
                //Sending token in response body -
                res.status(201).send({status:true,data: token})
              }catch (err) {
                res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: err.message });
              }
};

module.exports= {createStudent, loginStudent}