const app  = require('../app.js')
const { User, sequelize, Song } = require('../models')
const request = require('supertest')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')

describe('Song Routes Test', () => {
  let userToken, userToken2, user2song

  const userData = {
    email: 'd@mail.com',
    password: 'qweqwe'
  }

  const userData2 = {
    email: 's@mail.com',
    password: 'qweqwe'
  }

  beforeAll(done => {
    User.create(userData)
      .then(user => {
        userToken = jwt.sign({ id: user.id }, 'kucing')
        return User.create(userData2)
      })
      .then(user2 => {
        userToken2 = jwt.sign({ id: user2.id }, 'kucing')
        return Song.create({
          title: '1901',
          UserId: user2.id,
          lyric: `Counting all different ideas drifting away
          Past and present they don't matter
          Now the future's sorted out
          Watch her moving in elliptical patterns
          Think it's not what you say
          What you say is way too complicated
          For a minute though I couldn't tell how to fall out
          It's twenty seconds till the last call
          You're going hey hey hey hey hey hey
          Lie down you know it's easy
          Like we did it over summer long
          And I'll be anything you ask and more
          You're going hey hey hey hey hey hey hey
          It's not a miracle we needed
          No I wouldn't let you think so
          Fold it, fold it, fold it, fold it
          Fold it, fold it, fold it, fold it
          Girlfriend, oh your girlfriend is drifting away
          Past and present 1855-1901
          Watch them built up a material tower
          Think it's not gonna stay anyway
          I think it's overrated
          For a minute though I couldn't tell how to fall out
          It's twenty seconds till the last call
          You're going hey hey hey hey hey hey
          Lie down you know it's easy
          Like we did it over summer long
          And I'll be anything you ask and more
          You're going hey hey hey hey hey hey hey
          It's not a miracle we needed
          No I wouldn't let you think so
          Fold it, fold it, fold it, fold it
          Fold it, fold it, fold it, fold it
          Fold it, fold it, fold it, fold it
          Fold it, fold it, fold it, fold it
          Fold it, fold it, fold it, fold it
          Fold it, fold it, fold it, fold it`,
          artist: 'Wolfgang Amadeus Phoenix'
        })
      })
      .then(song => {
        user2song = song
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  afterAll(done => {
    queryInterface
      .bulkDelete('Users', {})
      .then(() => queryInterface.bulkDelete('song', {}))
      .then(() => done())
      .catch(err => done(err))
  })

  describe('POST /song - create new song', () => {
    const newSong = {
      title: `Lisztomania`,
      artist: 'Wolfgang Amadeus Phoenix',
      lyric: `So sentimental
      Not sentimental no
      Romantic not discussing it
      Darling I'm down and lonely
      When were the fortunate only?
      I've been looking for something else
      Too late, too late, too late, she'll be late, too late, too late
      So go slowly discourage
      Distant from other interests
      On your favorite weekend
      Ending this love for gentlemen only
      That's where the fortunate only
      No I gotta be someone else
      These days it comes, it comes, it comes, it comes, it comes and goes
      A Lisztomania
      Think less but see it grow
      Like a riot like a riot oh
      Not easily offended
      Know how to let it go
      From the mess to the masses
      A Lisztomania
      Think less but see it grow
      Like a riot like a riot oh
      Not easily offended
      Know how to let it go
      From the mess to the masses
      Follow, misguide, stand still
      Discuss, discourage
      On this precious weekend
      Ending this love for gentlemen only
      Wealthier gentlemen only
      Now that you're lonely
      Too late, too late, too late, she'll be late, too late, too late
      So go slowly discourage
      We'll burn the pictures instead
      When it's all over we can barely discuss
      For one minute only
      Not where the fortunate only
      But I better be something else
      These days it comes, it comes, it comes, it comes, it comes and goes
      A Lisztomania
      Think less but see it grow
      Like a riot like a riot, oh
      Not easily offended
      Know how to let it go
      From the mess to the masses
      A Lisztomania
      Think less but see it grow
      Like a riot like a riot oh
      Not easily offended
      Know how to let it go
      From the mess to the masses
      Oh
      This is show time, this is show time, this is show time
      Oh
      This is show time, this is show time, this is show time
      Time, time is your love, time is your love, yes time is your love
      Time, time is your love, time is your love, yes time is your
      From the mess to the masses
      A Lisztomania
      Think less but see it grow
      Like a riot like a riot oh
      Discuss, discuss, discuss, discuss, discuss discourage`
    }
    console.log(newSong.lyric.length)

    test('201 Success post song - should create new Song', (done) => {
      request(app)
        .post('/songs')
        .send(newSong)
        .set('access_token', userToken)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(201)
          expect(body).toHaveProperty('id', expect.any(Number))
          expect(body).toHaveProperty('title', 'Lisztomania')
          expect(body).toHaveProperty('artist', 'Wolfgang Amadeus Phoenix')
          expect(body).toHaveProperty('lyric', newSong.lyric)
          done()
        })
    })

    test('400 Failed post song - should return error if lyric is null', (done) => {
      request(app)
        .post('/songs')
        .send({
          title: 'If i ever feel better',
          artist: 'Phoenix'
        })
        .set('access_token', userToken)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Lyric cannot be empty')
          done()
        })
    })

    test('400 Failed post song - should return error if title is null', (done) => {
      request(app)
        .post('/songs')
        .send({
          artist: 'Phoenix',
          lyric: 'Sambala sambala sambal sambalado'
        })
        .set('access_token', userToken)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Title cannot be empty')
          done()
        })
    })

    test('400 Failed post song - should return error if artist is null', (done) => {
      request(app)
        .post('/songs')
        .send({
          title: 'Young Folks',
          lyric: 'Sambala sambala sambal sambalado'
        })
        .set('access_token', userToken)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', 'Artist cannot be empty')
          done()
        })
    })

    test('400 Failed post song - should return error if access_token not provided', (done) => {
      request(app)
        .post('/songs')
        .send(newSong)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'Failed to authenticate')
          done()
        })
    })

    
  })

  describe('DELETE /song - delete a song', () => {

    test('401 Failed delete song - should not delete a song if not authorized', (done) => {
      request(app)
        .delete('/songs/' + user2song.id)
        .set('access_token', userToken)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'You are not authorized')
          done()
        })
    })

    test('401 Failed delete song - should not delete a song if not login', (done) => {
      request(app)
        .delete('/songs/' + user2song.id)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('message', 'Failed to authenticate')
          done()
        })
    })

    test('404 Failed delete song - should not delete a song if not found', (done) => {
      request(app)
        .delete('/songs/9999')
        .set('access_token', userToken)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(404)
          expect(body).toHaveProperty('message', 'song not found')
          done()
        })
    })

    test('200 Success delete song - should delete a song if authorized', (done) => {
      request(app)
        .delete('/songs/' + user2song.id)
        .set('access_token', userToken2)
        .then(response => {
          const { body, status } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('message', 'Success delete a Song')
          done()
        })
    })
    
  })
})
