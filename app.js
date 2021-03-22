const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const http = require('http');
const ejs = require('ejs');
var mysql = require("mysql");
const app = express();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var _ = require('lodash');
var fp = require('lodash/fp');


app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));

const description = "Coronavirus disease 2019 (COVID-19) is a contagious disease caused by severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2)"
const symptom = "  Symptoms of COVID-19 are variable, but often include fever, cough, fatigue, breathing difficulties, and loss of smell and taste. Symptoms begin one to fourteen days after exposure to the virus";



app.get('/' ,function(req,res){
  res.render("login");
});

 app.post("/",function(req,res){
   var email =(req.body.email);
   var password = req.body.password;
   if(email == "tusharvikram@DBMS.com" && password == "TUSHARVIKRAM")
  {
    res.render("main",{Description:description,Symptom:symptom});
  }
  else
  {
    alert("Wrong Email OR Password");
  }
});
app.get('/main',function(req,res){
  res.render("main",{Description:description,Symptom:symptom});
})

//patientdetail
app.get("/patientdetail",function(req,res){
  res.render("patientdetail");
});
app.post("/patientdetail",function(req,res){
  var first_name = req.body.firstName;
  var last_name = req.body.lastName;
  var date_of_birth = req.body.DOB;
  var age = req.body.age;
  var phone_number = req.body.phoneNumber ;
  var bloodgroup = req.body.bloodGroup;
  var address = req.body.address;
  var gender = req.body.gender;
  var status = req.body.status;
  var id = first_name.substring(0,2)+date_of_birth.substring(6,);
  var sys_id = req.body.SYS_ID;
var sql = "insert into patient values('"+id+"','"+first_name+"','"+last_name+"','"+date_of_birth+"','"+age+"','"+phone_number+"','"+bloodgroup+"','"+address+"','"+gender+"','"+status+"','"+sys_id+"')";
con.query(sql ,function(err,rows,fields){
  if(err) throw err;
console.log("Successfully added");

});


});

//DOCTOR DETAIL
app.get("/doctordetail",function(req,res){
  res.render("doctordetail");
});
app.post("/doctordetail",function(req,res)
{
  var docid = req.body.Docid;
  var first_name = req.body.DoctorfirstName;
  var last_name = req.body.DoctorlastName;
  var phone_number = req.body.phoneNumber ;
  var address = req.body.address;
  var gender = req.body.gender;

var sql = "insert into doctor values('"+first_name+"','"+last_name+"','"+phone_number+"','"+address+"','"+gender+"','"+docid+"')";
con.query(sql ,function(err,rows,fields){
  if(err) throw err;
console.log("successfully added");
});
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "corona"
}); //user-root password-password
con.connect(function(err){
  if(err) throw err;

  console.log("connected");
});

var obj = {};
app.get('/Doctor-database', function(req, res){

    con.query('SELECT * FROM doctor', function(err, result) {

        if(err){
            throw err;
        } else {
            obj = {print: result};
            res.render('Doctor-database', obj);
        }
    });

});

app.get('/Patient-database', function(req, res){

    con.query('SELECT * FROM patient', function(err, result) {

        if(err){
            throw err;
        } else {
            obj = {print: result};
            res.render('Patient-database', obj);
        }
    });

});
app.get('/positive', function(req, res){

    con.query('SELECT * FROM patient where covid_status="positive"', function(err, result) {

        if(err){
            throw err;
        } else {
            obj = {print: result};
            res.render('positive', obj);
        }
    });

});
app.get('/doc-pat',function(req,res){
let sql="select patient.ID,concat(patient.first_name,' ',patient.last_name) as Patient_name,patient.phone_number as pat_phn,concat(doctor.FirstDocName,' ',doctor.LastDocName) as Treated_by_DR,doctor.phone_number as Doc_phn,doctor.sys_id from doctor inner join patient on doctor.sys_id = patient.sys_id;";
  con.query(sql,function(err,result)
{
if(err){
  throw err;
}
else{
  obj = {print: result};
  res.render('doc-pat', obj);
}
});
});
app.get('/Delete-rec',function(req,res){
  res.render("Delete-rec");
})
app.post('/Delete-rec',function(req,res){
var key = req.body.key;
let sql='Delete from patient where first_name="'+key+'"';;
con.query(sql,function (err,result) {
  if(err){
    throw err;
    }
    else {
console.log("successfully droped");
    }
});
});

app.get("/contact",function(req,res) {
  res.render("contact");
});
app.listen(3000,function(){
  console.log("server is running");
});
