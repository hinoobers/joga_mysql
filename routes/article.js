let router = require('express').Router();

const articleController = require("../controllers/article")

router.get("/", articleController.getAllArticles)
router.get("/article/:slug", articleController.getArticleBySlug)

module.exports = router;