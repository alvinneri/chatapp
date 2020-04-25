const express = require('express');
const router = express.Router();
const User = require('./models/userModel');

router.get('/', (req,res) => {
    res.send('Server is running');
});

router.post('/login',(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username : username}, (err,user) =>{

        if(err){
            res.json({error: "Error in registering your username"});
        } else if(username ==='' || password ===''){
            res.json({error: 'Blank'});
        } 
        else if(user){
            if(user.password === password){
                res.json({user: user})
            }else{
                res.json({error: "!Password"})
            }
        }else{
            const newUser = new User ({
                username: username,
                password : password
            });
            newUser.save();
            res.json({user : user})
        }
    })

})

module.exports = router;