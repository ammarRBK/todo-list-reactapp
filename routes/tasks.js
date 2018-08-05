//require db file, express and express router
var express= require('express');
var router= express.Router();
var db= require('../database/db');
var app= express();
//take the corrent date and time to assign the task
var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M');
//session object
var session= require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
//require authenticated user from users router
const userQuery= require('./users').query;

//get the authenticated user tasks and send to client
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

//recieve new tasks from client and save them in the database
router.post('/addTask',(req,res,next)=>{

        db.update({
            _id: userQuery.user._id
        }, {
//after finding the user push new task object to tasks array inside
// the user document with defult "Still" status.            
            $push: {
                tasks: {task: req.body.task, date: formatted, done: "still"}
            }
        }, function(err, updateUser) {
            if (err) {
                console.log('error')
            } else {
                res.send({ message: "task added" })
            }
        })
});

//recieve the old and new tasks from client and edit the old to the new one.
router.post('/editTask',(req,res)=>{
    var oldTask= req.body.oldTask;
    var newTask= req.body.newTask;
    db.update({
//search by "user _id" after that search for the specified task object inside
// tasks array depending on the sent old task
        _id: userQuery.user._id,"tasks.task": oldTask  
    },
    {
//set the old task to the new task
    $set: {
            "tasks.$.task": newTask
        }        
    },function (err,updateUser){
        err ? res.send("Cannot update Task "+err) : res.send("User task updated");
    })       
});

//recieve the task and new task status from client and edit the old to the new one.
router.post('/marktask', (req,res,next)=>{
    db.update({
//search by "user _id" after that search for the specified task object inside
// tasks array depending on the sent task
        _id: userQuery.user._id, "tasks.task": req.body.task
    },
    {
//change the status.
        $set: {
            "tasks.$.done": req.body.newStatus
        }
    },(err)=>{
        err ? res.status(500).send("Cannot set the new status for the task") : res.status(200).send("The task "+req.body.task+" has sitted.");
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