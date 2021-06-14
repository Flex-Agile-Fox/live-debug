const express = require("express");
const router = express.Router();
const SongController = require("../controllers/songController");
const Auth = require("../middlewares/auth");

router.use(Auth.authentication);
router.post("/", SongController.create);
router.use(Auth.authorization);
router.delete("/:id", SongController.delete);

module.exports = router;
