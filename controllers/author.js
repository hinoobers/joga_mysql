const con = require("../utils/db")

const getAuthorPosts = (req, res) => {
    console.log("GOT");
    const authorId = req.params.slug;

    con.query(`SELECT * FROM author WHERE id=${authorId}`, (err, ress) => {
        con.query(`SELECT * FROM article WHERE author_id=${authorId}`, (err2, ress2) => {
            // ress2.forEach(e => {
            //     e.author = {}
            //     e.author.name = ress[0].name;
            //     e.author.id = ress[0].id
            // })
            res.render("author", {articles: ress2, author: ress[0]})
        })
    });
};

module.exports = {getAuthorPosts}