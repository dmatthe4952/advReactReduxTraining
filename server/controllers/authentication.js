const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({sub:user.id, iat:timestamp}, config.secret);
}

exports.signup = function(req, res, next){
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
      return res.status(422).send({error:"You must submit Email and Password."})
    }
  //See if a user with the given email exists
  User.findOne({"email":email}, (err, existingUser) => {
    if(err) {return next(err)}
    if(existingUser){
      return res.status(422).send({error:"Email is in use"});
    } else{
      const user = new User({
        "email":email, "password":password
      });
      user.save( (err)=>{
        if(err){return next(err);}
        return res.status(200).send({token:tokenForUser(user)});
      });
    }
  });
};

exports.signin = function(req, res, next) {
  const user = req.user;

  return res.status(200).send({token:tokenForUser(user)});
}
