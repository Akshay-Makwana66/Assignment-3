const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt')
const adminRegistration = require('../model/adminRegistration');
const saltRounds = 10;
// ### admin API 
const createAdmin = async function (req, res) {                   
  try {
    let data= req.body;    
    if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty" });
 // Creating the admin document in DB
 let {name,email,password}=data;

 if (!name) return res.status(400).send({ status: false, msg: "Please enter  Name" });
 if (typeof name !== "string")return res.status(400).send({ status: false, msg: " Please enter  name as a String" });
 if(!/^\w[a-zA-Z.]*$/.test(name)) return res.status(400).send({ status: false, msg: "The  name may contain only letters" });
 name = name.trim();

 if (!password)return res.status(400).send({ status: false, msg: "Please enter Password" });
 if (typeof password !== "string")return res.status(400).send({ status: false, msg: " Please enter password as a String" });
 if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(password))return res.status(400).send({status: false,msg: "Please enter min 8 letter password, with at least a symbol, upper and lower case letters and a number"});
 password = password.trim();

 if (!email) return res.status(400).send({ status: false, msg: "Please enter E-mail" });
 if (typeof email !== "string") return res.status(400).send({ status: false, msg: "Please enter email as a String" });
 if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) return res.status(400).send({ status: false, msg: "Entered email is invalid" });
  let duplicateEmail = await adminRegistration.find({ email: email });
 if (duplicateEmail.length !== 0) return res.status(400).send({ status: false, msg: `${email} already exists` });

     data.password = await bcrypt.hash(data.password, saltRounds);
    let save = await adminRegistration.create(data);  

    res.status(201).send({ status: true, data: save });  

  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

const loginAdmin= async function(req,res){
  try{
    let data = req.body

    // Checks whether body is empty or not
    if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty"});

    // Checks whether email is entered or not
    if (!data.email) return res.status(400).send({ status: false, msg: "Please enter E-mail"});
    let userEmail= data.email

     // Checks whether password is entered or not
    if (!data.password) return res.status(400).send({ status: false, msg: "Please enter Password" }); 
   
    let userPassword= data.password

    let checkCred= await adminRegistration.findOne({email: userEmail})
    if(!checkCred) return res.status(401).send({status:false, msg:"Email is incorrect"})
    let decryptPassword =  bcrypt.compare(userPassword, checkCred.password);

    if (!decryptPassword) {  
      return res
        .status(401)
        .send({ status: false, message: "Password is not correct" });
    }

    //Creating token if e-mail and password is correct
    let token= jwt.sign({
      userId: checkCred._id.toString(),
    }, "Assignment");
    //Setting token in response header
    res.setHeader("x-api-key",token)
    res.status(201).send({status:true,data: token})
  }catch (error) {
  res.status(500).send({ status: false, msg: error.message});
  }
}

module.exports= {createAdmin, loginAdmin}