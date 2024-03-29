require('dotenv').config();
const JWT = require("jsonwebtoken");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config/properties.json'));
;

const authorization = (req,res)=>{
    JWT.verify(req.headers.authorization, process.env.SECRET_KEY,(err, response) =>{
        if(response && response.data){
            const userDetails = {
                id: response.data.id,
                name: response.data.username,
                email: response.data.email,
                profilePic: response.data.profilePic
            }
            return res.status(200).json(userDetails);
        }else{
            
            return res.redirect(`${config.baseURL}/login`);
        }
    })
}

module.exports = authorization;