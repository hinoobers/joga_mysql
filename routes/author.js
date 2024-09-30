let router = require('express').Router();

const authorController = require("../controllers/author")

router.get("/:slug", authorController.getAuthorPosts)

module.exports = router;