//url: https://morning-shore-89253.herokuapp.com/

//jshint esversion: 8

const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// const mailchimp = require("@mailchimp/mailchimp_marketing");
// mailchimp.setConfig({
//   apiKey: "7036ff88c1acfe95a4708debc65682dc-us14",
//   server: "us14",
// });

app.post("/", function(req, res){

  //without using package, using good ol' url systems
  const member = {
    email_address: req.body.email,
    status: "subscribed",
    merge_fields: {
      FNAME: req.body.fName,
      LNAME: req.body.lName
    }
  };

  const jsonData = JSON.stringify(member);
  const url = "https://us14.api.mailchimp.com/3.0/lists/f3a888a4b4/members";
  const options = {
    method: "POST",
    auth: "tan1:7036ff88c1acfe95a4708debc65682dc-us14"
  };

  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

  //using package dependency, using functions for url paths

  // const subscribingUser = {
  //   firstName: req.body.fName,
  //   lastName: req.body.lName,
  //   email: req.body.email
  // };

  // const run = async() => {
  //   const response = await mailchimp.lists.addListMember("f3a888a4b4", {
  //     email_address: subscribingUser.email,
  //     status: "subscribed",
  //     merge_fields:{
  //       FNAME: subscribingUser.firstName,
  //       LNAME: subscribingUser.lastName,
  //     }
  //   });
  //   console.log(response);
  // };
  //
  // run();
});

app.get("/", function(req, res){
  console.log(req.statusCode);
  res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is up and running at port 3000.");
});
