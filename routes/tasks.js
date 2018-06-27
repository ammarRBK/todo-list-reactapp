var express= require('express');
var router= express.Router();
var db= require('../database/db');
var app= express();


router.get('/',(req,res, next)=> {
    res.send('Welcom to tasks');
});

router.post('/addTask',(req,res,next)=>{
    if(req.body.task){
        db.update({
            user_name: "ammar1"
        }, {
            $push: {
                tasks: req.body.task
            }
        }, function(err, updateUser) {
            if (err) {
                console.log('error')
            } else {
                res.send(updateUser)
            }
        })
    }
    console.log('Please submit a Task');

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
    if(oldTask !== ""){
        db.update({
            _id: "5b27edb89356d723550757b3"
        }, {
            $pull: {
                tasks: oldTask
            }
        }, function(err, updateUser) {
            if (err) {
                console.log(err)
            } else {
    
                console.log('pulled successfully', updateUser);
            }
        
        })
    }
    res.send("please submit a task"); 
});

module.exports= router;