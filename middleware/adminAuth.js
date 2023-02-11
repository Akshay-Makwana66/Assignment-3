const jwt = require("jsonwebtoken");

const adminAuthentication = async function (req, res, next) {
                  try {
                       let token = req.headers["x-api-key"];

                       if (!token) return res.status(400).send({ status: false, msg: "Enter token in header" });

                       jwt.verify(token,"ADMIN",function(error,decoded){

                       if(error)return res.status(401).send({ status: false, msg: "Invalid Token" });

                       else 
                       next()
                  });   
                       } catch (err) {
                          res.status(500).send({ status: false, msg: err.message });
                       }
};



module.exports = { adminAuthentication};