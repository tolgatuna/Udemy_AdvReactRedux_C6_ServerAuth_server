const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model :
const userSchema = new Schema({
    email: {type: String, unique:true, lowercase: true},
    password: String
});

// On Save Hook, encrypt password
// Before saving a modal, run this function
userSchema.pre('save', function (next) {
    // get access to the user model
    const user = this;  //user.email, user.password

    // generate a salt then run callback (function (err, salt))
    bcrypt.genSalt(10, function (err, salt) {
        if(err) {
            return next(err);
        }

        // After generate salt, hash (encrypt) our password using the generated salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
           if(err) {
               return next(err);
           }

           // Overwrite our plain text user password with hashed (encrypted) password
           user.password = hash;
           next();  // Go ahead and do save operation after all
        });
    });
});


// Create the model class :
const modelUserClass = mongoose.model('user',userSchema);


// Export the model :
module.exports = modelUserClass;