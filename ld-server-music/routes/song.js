const express = require("express");
const router = express.Router();
const SongController = require("../controllers/songController");
const Auth = require("../middlewares/auth");

router.use(Auth.authentication);
router.post("/", SongController.create);
router.delete("/:id", Auth.authorization, SongController.delete);

module.exports = router;
