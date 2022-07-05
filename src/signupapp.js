const express = require("express");
const app = express();
const path = require("path");
const port = process.env.port || 80;
require("./db/connection");
const mongoose = require("mongoose")
const db = mongoose.connection
const bodyParser = require("body-parser")
const signupstructure = require('./models/structure')
    //const Joi = require("joi");

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({
//    extended: true
//}))

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

staticPath = path.join(__dirname, "../public");


app.use(express.static(staticPath));

app.get("/registration", (req, res) => {
    res.redirect("registration.html");

})

app.get("/login", (req, res) => {
    res.redirect("login.html");

})


app.post("/registration", async(req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var cpassword = req.body.cpassword;


    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password,
        "cpassword": cpassword
    }

    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password == cpassword) {

            //implementing our schema
            const getsignupform = new signupstructure({
                    name: req.body.name,
                    email: req.body.email,
                    phno: req.body.phno,
                    password: req.body.password,
                    cpassword: req.body.cpassword


                })
                // console.log(getsignupform.save());
            const signuped = await getsignupform.save()
                //return res.redirect('AfterSignUp.html')
            res.status(201).redirect('AfterSignUp.html')
            db.collection('users').insertOne(data, (error, collection) => {
                if (error) {
                    throw error;
                }
                console.log("Record Inserted Successfully");
            });

        } else {
            return res.status(400).send("Password not matching");
        }
    } catch (error) {

        return res.status(400).send(error);
    }



})

app.get("/", (req, res) => {

    res.set({
        //since we are communcating to the server by local host so we will use this cors to get the access
        "Allow-access-Allow-Origin": '*'
    })
    res.redirect('login.html');
});


app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const check = await signupstructure.findOne({ email: email });

        if (check.password === password) {
            res.status(201).redirect('AfterSignIn.html')

            //res.redirect("AfterSignIn.html")
        } else {
            res.send("password invalid")
        }
    } catch (error) {
        res.status(400).send("Invalid Credentials")
        console.log(error);


    }


})


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);


});