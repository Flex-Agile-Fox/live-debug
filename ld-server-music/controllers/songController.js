const { Song } = require('../models')

class SongController {
  static create(req, res, next) {
    const { title, artist, lyric } = req.body
    Song.create({
      title,
      artist,
      lyric,
      UserId: req.loggedInUser.id
    })
      .then(song => {
        res.status(201).json({
          id: song.id,
          title: song.title,
          artist: song.artist,
          lyric: song.lyric
        })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Song.destroy({
      id: req.params.id
    })
      .then(data => {
        if(data === 1) {
          res.status(200).json({
            message: 'Success delete a Song'
          })
        } else {
          throw createError(500, "Internal server error")
        }
      })
      .catch(next)
  }
}

module.exports = SongController