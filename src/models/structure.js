//define schema---- structure for document

const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    //lastName: {
    //  type: String,
    //require: true
    //},
    //age: {
    //  type: String,
    // require: true
    //},
    email: {
        type: String,
        require: true,
        unique: true
    },
    // phoneNumber: {
    //   type: Number,
    // require: true,
    //unique: true

    //},
    phno: {
        type: Number,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    cpassword: {
        type: String,
        require: true
    },

})

//now we need to create a collections

//jis collection par maine is schema ko wrap karna h model mai yeh kam hota h

const SignUp = new mongoose.model("SignUp", SignupSchema)
    ////Register for collection name ka R capital hoga plus const k sath jo R laga hua h woh class hai uska b first R capital hoga
module.exports = SignUp;