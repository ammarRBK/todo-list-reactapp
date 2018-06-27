var express = require('express');
var router = express.Router();

var tasks= [
        {_id:1,isbn:"23",title:"Go home",auther:"Ammar"},
        {_id:3,isbn:"3",title:"Go home",auther:"Mohammad"}
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express REST API');
});

router.get('/todoList',(req,res)=>{
  res.send(tasks);
})

module.exports = router;