const { User, Song } = require('../models')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

class Auth {
  static authentication (req, res, next){

    try { 
      req.loggedInUser = jwt.verify(req.headers.access_token, 'kucing')
      User.findOne(req.loggedInUser.id)
        .then(result => {
          if(!result) { throw createError(404, "User not found!")}
        })
        .catch(err => {
          next(err)
        })
    }
    catch (err){
      next(err)
    }

  }
  static authorization (req, res, next){
    let songId = req.params.songId

    Song.findByPk(songId)
      .then(result => {
        if (!result) throw createError(404, "song not found")
        if(result.UserId == req.loggedInUser.id){
          next()
        }
        else { 
          throw createError(401, "You are not authorized")
        }
      })
      .catch(next)
  }
}

module.exports = Auth