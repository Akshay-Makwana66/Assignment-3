const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt')
const adminRegistration = require('../model/adminRegistration');
const saltRounds = 10;

// Admin Registration API -
const createAdmin = async function (req, res) {                   
            try {
                 let data= req.body;      
                 data.password = await bcrypt.hash(data.password, saltRounds);
                 let savedData = await adminRegistration.create(data); 
                 res.status(201).send({ message:'Your Registration Is Done Successfully', data: savedData }); 
                }catch (err) {
                  res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: err.message });
            }
};

// Admin Login API -
const loginAdmin= async function(req,res){
            try{
                let data = req.body;

                let userEmail= data.email    
                let userPassword= data.password

                let checkCred= await adminRegistration.findOne({email: userEmail})
                if(!checkCred) return res.status(401).send({status:false, msg:"Email is incorrect"})
                let decryptPassword =  bcrypt.compare(userPassword, checkCred.password);

                if (!decryptPassword) {  
                return res.status(401).send({ status: false, message: "Password is not correct" });
                }

                //Creating token if E-mailId and password is correct -
                let token= jwt.sign({
                userId: checkCred._id.toString(),
                }, "ADMIN");
                //Sending token in response body
                res.status(201).send({message:'You Successfully LoggedIn',data: token})
                }catch(err) {
                res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: err.message });                
                }
}

module.exports= {createAdmin, loginAdmin}