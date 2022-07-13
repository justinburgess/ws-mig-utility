const mongoose = require('mongoose');
const Schema = mongoose.Schema();
// var bcrypt = require('bcrypt');

var ConnectionSchema = new mongoose.Schema({
    connectionName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    apiAdmin: {
        type: String,
        required: true,
        trim: true,
    },
    apiAdminPassword: {
        type: String,
        required: true,
    },
    wsClientId: {
        type: String,
        required: true,
    },
    wsClientSecret: {
        type: String,
        required: true,
    },
    apiAccessToken: {
        type: String,
        required: true,
    },
    apiTokenRefreshTime: {
        type: Date,
        required: true,
    }
});

// authenticate input against database documents
// ConnectionSchema.statics.authenticate = function(email, password, callback) {
//     User.findOne({email: email})
//         .exec(function (error, user) {
//             if (error) {
//                 return callback(error);
//             } else if (!user) {
//                 var err = new Error('User not found.');
//                 err.status = 401;
//                 return callback(err);
//             }
//             bcrypt.compare(password, user.password, function(error, result) {
//                 if (result === true) {
//                     return callback(null, user);
//                 } else {
//                     return callback();
//                 }
//             })
//         });
// }

// hash password before saving to database
// UserSchema.pre('save', function(next) {
//     var user = this;
//     bcrypt.hash(user.password, 10, function(err, hash) {
//         if(err) {
//             return next(err);
//         }
//         user.password = hash;
//         next();
//     });
// });
var Connection = mongoose.model('Connection', ConnectionSchema);
module.exports = Connection;
