var popup = require('popups');
document.querySelector(".submit-but").on('click', function(res){
     res.load("http://localhost:3000/patientdetail");
});
document.querySelector(".submit-but").addEventListener('click',fucntion(){
alert("added");
});
