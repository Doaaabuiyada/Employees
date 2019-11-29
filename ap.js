var express = require('express');
const bodyParser= require('body-parser');
const mysql = require('mysql')

var app = express(); 
app.listen(88);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const connection = mysql.createConnection({
   host:"localhost",
   user:"root", 
   password:"",
   database : "emp" 
});

connection.connect(function(err){
    if(err){
        throw err; 
    }
    console.log("YOU are connected");
})
app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/employee.html');
})

//get all employees. 
app.get('employees', function (req, res) {
    connection.query('select * from employee', function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });
  

 //rest api to create a new record into mysql database
 app.post('/employees', function (req, res) {
    var postData  = req.body;
    connection.query('INSERT INTO employee SET ?', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });
  