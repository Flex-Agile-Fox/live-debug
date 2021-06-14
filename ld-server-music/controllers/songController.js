const { Song } = require("../models");
const createError = require("http-errors");

class SongController {
	static create(req, res, next) {
		const { title, artist, lyric } = req.body;
		Song.create({
			title,
			artist,
			lyric,
			UserId: req.loggedInUser.id,
		})
			.then((song) => {
				res.status(201).json({
					id: song.id,
					title: song.title,
					artist: song.artist,
					lyric: song.lyric,
				});
			})
			.catch((err) => {
				next(err);
			});
	}

	static delete(req, res, next) {
		let song = req.song;
		song
			.destroy()
			.then(() => {
				res.status(200).json({
					message: "Success delete a Song",
				});
			})
			.catch((err) => next(err));
	}
}

module.exports = SongController;
