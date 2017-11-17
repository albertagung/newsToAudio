const FacebookModel = require('../models/facebook')
const jwt = require('jsonwebtoken')
const FB = require('fb')
const mongoose = require('mongoose')

class Facebook {

  static loginFB(req, res) {
      FacebookModel.MdlFB(req.headers.token)
        .then(data => {
            console.log('INI DATA', data);
            var jwtToken = jwt.sign(data, process.env.SECRET_KEY);
            var decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
            console.log('INI DECODED', decoded);
            FacebookModel.fbuser.findOne({email: decoded.email})
            .then(user => {
              if (user) {
                return -1
              } else {
                FacebookModel.fbuser.create({
                  fb_id: decoded.id,
                  name: decoded.name,
                  email: decoded.email
                })
                .then(created => {
                  res.send(created)
                })
                .catch(err => {
                  console.log(err);
                })
              }
            })

            //     id: decoded.id
            // })
            //   .then(data2 => {
            //     console.log('TESAJALAH',data2);
            //   })
              // FacebookModel.fbuser.findOne({decoded: decoded.id})
              // .then(tes => {
              //   console.log('BALASDSADASDNASDNASJDNAS',tes)
              //   if (userFacebook) {
              //     console.log('SUDAH ADA TOKEN');
              //   } else {
              //     FacebookModel.create({
              //       fb_id: userFacebook.id,
              //       name: userFacebook.name,
              //       email: userFacebook.email
              //     })
              //     .then(data => {
              //       console.log('BERHASIL REGISTER',data);
              //     })
              //     .catch(err => {
              //       console.log('GAGAL REGISTER',err);
              //     })
              //   }
              // })
              res.send({token: jwtToken, name: decoded.name})
              // console.log('INI JWT TOKEN', jwtToken);
              // })
              .catch(err => {
                console.error(err);
              })
      })
  }
      static tesPost (req,res) {
        FacebookModel.fbuser.create({
          fb_id: req.body.fb_id,
          name: req.body.name,
          email: req.body.email
        })
        .then(data=> {
          res.send(data)
        })
        .catch(err => {
          console.log(err);
        })
      }

      static findAll (req,res) {
        FacebookModel.fbuser.find({})
        .then(data=> {
          res.send(data)
        })
        .catch(err => console.log(err))
      }

      static delete (req,res) {
        FacebookModel.fbuser.remove({_id: req.params.id})
        .then(data => {
          res.send(data)
        })
        .catch(err => console.log(err))
      }
    }
      module.exports = Facebook
