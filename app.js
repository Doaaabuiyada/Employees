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

//get all data from database
app.get('/employees', function (req, res) {
    connection.query('select * from employee', function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });
  
 //rest api to get a single employee data
 app.get('/employees/:id', function (req, res) {
    console.log(req);
    connection.query('select * from employee where id=?', [req.params.id], function (error, results, fields) {
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
  
 //rest api to update record into mysql database
 app.put('/employees', function (req, res) {
    connection.query('UPDATE `employee` SET `employee_name`=?,`employee_salary`=?,`employee_age`=? where `id`=?', [req.body.employee_name,req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });
  
 //rest api to delete record from mysql database
 app.delete('/employees', function (req, res) {
    console.log(req.body);
    connection.query('DELETE FROM `employee` WHERE `id`=?', [req.body.id], function (error, results, fields) {
       if (error) throw error;
       res.end('Record has been deleted!');
     });
 });
