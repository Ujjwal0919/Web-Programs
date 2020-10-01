const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 12;

const userSchema = new mongoose.Schema(
  {
    userName: {
      unique: true,
      type: String,
      maxlength: 10,
    },

    firstName: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
      maxlength: 32,
    },

    email: {
      type: String,
      trim: true,
      maxlength: 32,
      unique: true,
      required: true,
    },

    encrypt_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function(pass){
  this._pass = pass;
  this.encrypt_password = this.securePassword(pass);
}).get(function(){
  return this._pass;
});

userSchema.methods = {
  authenticate: function (plainpassword) {
    bcrypt.compare(plainpassword, this.encrypt_password, function (
      err,
      result
    ) {
      return result;
    });
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(plainpassword, salt, function (err, hash) {
          return hash;
        });
      });
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
