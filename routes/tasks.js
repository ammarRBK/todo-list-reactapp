var express= require('express');
var router= express.Router();
var db= require('../database/db');
var app= express();

var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M');

var session= require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

const userQuery= require('./users').query;

router.get('/getusertasks',(req,res, next)=> {
    console.log("=======================================> SESSION",userQuery)
    db.findOne({ _id: userQuery.user._id },(err,user)=>{
        err ? res.send("unable to find user") : 
         userFind={
            message: "these are Tasks",
            tasks: user.tasks
        }
        res.send(userFind);
    })
});

router.post('/addTask',(req,res,next)=>{
    console.log("ADD TASK BODY--------->",JSON.stringify(req.body.task));
        db.update({
            _id: userQuery.user._id
        }, {
            $push: {
                tasks: {task: req.body.task, date: formatted, done: false}
            }
        }, function(err, updateUser) {
            if (err) {
                console.log('error')
            } else {
                res.send({ message: "task added" })
            }
        })
});

router.post('/editTask',(req,res)=>{
            var oldTask= req.body.oldTask;
            var newTask= req.body.newTask;
            db.update({
                "_id": "5b27edb89356d723550757b3"
            },
            {
                "$set": {
                    tasks:{
                        oldTask: newTask
                    }
                    
                }
            },function (err){
                if(err){
                    console.log("Cannot update Task ",err);
                }
                console.log("Task updated");
            })
            
});

router.post('/deleteTask',(req,res)=>{
    const oldTask= req.body.oldTask;
        db.update({
            _id: userQuery.user._id
        }, {
            $pull: {
                tasks: oldTask
            }
        }, function(err, updateUser) {
            if (err) {
                console.log(err)
            } else {
    
                console.log('pulled successfully', updateUser);
                res.send({message:'deleted successfully', tasks: updateUser.tasks})
            }
        
        });
});

module.exports= router;