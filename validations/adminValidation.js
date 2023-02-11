const adminRegistration = require('../model/adminRegistration');

const adminValidation = async (req,res)=>{
            try{
                let data = req.body;
                if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty" });
                // Creating the admin document in DB
                let {name,email,password}=data;   //Destructuring...

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

                }catch(err){
                 res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: err.message });
                }           
};

const adminLoginValidations = async(req,res)=>{
            try{
                let data = req.body;
                // Checks whether body is empty or not
                if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty"});
                  // Checks whether email is entered or not
                if (!data.email) return res.status(400).send({ status: false, msg: "Please enter E-mail"});
                // Checks whether password is entered or not
                if (!data.password) return res.status(400).send({ status: false, msg: "Please enter Password" }); 
              
                }catch(err){
                 res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: err.message });
                }
};

module.exports = {adminValidation,adminLoginValidations}