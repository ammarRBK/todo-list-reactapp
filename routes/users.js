var express= require('express');
var app= express();
var router= express.Router();
var db= require('../database/db');
var bcrypt= require('bcrypt');


//session for user tracking
// var session= require('express-session');
// var cookieParser= require('cookie-parser');
// app.use(cookieParser());
// app.use(session({ secret: "todolist" }));

router.get('/',(req,res)=>{
        res.send('welcome from users');
});
//sign up
router.post('/signup',(req,res)=>{
    var username= req.body.username;
    var password= req.body.password;
    var email= req.body.email;

    const saltRounds= 10;
    bcrypt.hash(password,saltRounds)
    .then((hashedPassword)=>{
        var newUser = {
            user_name: username,
            password: hashedPassword,
            email: email
        };
        console.log(newUser);
        var user = new db(newUser);
        user.save()
        .then(item => {
            res.redirect("/users")
        })
        .catch(err => {
            console.log('unable to save user')
        })
    })
    .then(()=>{
        
        res.send("User saved with hashed password");
    })
    .catch(error =>{
        res.send("cannot save user because error in hashing ",error);
    })

    
});

//signIn users
router.post('/signin',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    
    db.findOne({
        user_name: username
    }, function(err, user) {
        if (err) {
            console.log(err)
            return res.status(404).send('error in sign in');
        }
        if (!user) {
            return res.status(404).send('unable to find user');
        }
        else {
            bcrypt.compare(password,user.password)
            .then(samePassword =>{
                if(!samePassword){
                    res.status(403).send("wrong password");
                }
                // req.session.user={
                //     username: user.user_name,
                //     email: user.email
                // }
                res.cookie('newUser',{user_name: username});
                
                
                res.redirect('/tasks');
            })
            .catch(err =>{
                console.log("error in Comparing Password ", err);
            })
        }
    })
});

module.exports= router;