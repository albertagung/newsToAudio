let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongoose_news', {
  useMongoClient: true
});
let User = require('../models/usersModel.js')
let crypt = require('../helper/crypt.js')

// Insert new user into users collection
let insertDataUser = function(req,res){
  crypt(req.body.password).then(function(dataPassword){
    let newUser = new User(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: dataPassword,
        role: req.body.role
      }
    )
    newUser.save().then(function(dataUsers){
      res.send(dataUsers)
    }).catch(function(err){
      res.status(500).send(err)
    })
  })
}

// Find all documents in users collection
let findAllUser = function(req,res){
  User.find().then(function(dataUsers){
    console.log(dataUsers);
    res.send(dataUsers)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Update a document by id
let updateUserById = function(req,res){
  User.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      role: req.body.role
    }
  ).then(function(dataUsers){
    res.send(dataUsers)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

// Delete a document by id
let removeUserById = function(req,res){
  User.findOneAndRemove(
    {
      _id: req.params.id
    }
  ).then(function(dataUsers){
    res.send(dataUsers)
  }).catch(function(err){
    res.status(500).send(err)
  })
}

module.exports = {
  insertDataUser,
  findAllUser,
  updateUserById,
  removeUserById
}
