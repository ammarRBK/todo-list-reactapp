var mongoose= require('mongoose');

//create schema
var Schema= mongoose.Schema;

var usersSchema= new Schema({
    user_name:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String
    },
    tasks: {
        type: Array
    }
});

//connecting to online MLAB MONGODB database 

mongoose.connect("mongodb://cg-imagine:cg-imagine1234@ds163870.mlab.com:63870/todolist",(err,data)=>{
    if(err){
        console.log('Cannot connect to the database','\n',err)
    }
    console.log('connected to the database'); 
    
});

//setup model and export it

var users = mongoose.model ('users', usersSchema);

module.exports = users;