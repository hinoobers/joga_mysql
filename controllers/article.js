const con = require("../utils/db");

const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article";
    con.query(query, (err, result) => {
        if(err) throw err;
        res.render("index", {
            articles: result
        })
    })
}

const getArticleBySlug = (req, res) => {
    let query2 = `SELECT *
                    article.name AS article_name,
                    article.published AS published,
                    author.name AS author_name,
                    FROM article
                    INNER JOIN author
                    ON author.id = article.author_id WHERE slug="${req.params.slug}"`;
    let query = `SELECT 
                    article.name AS article_name,
                    article.published AS published,
                    article.image AS image,
                    article.body AS body,
                    author.name AS author_name,
                    author.id AS author_id
                FROM 
                    article
                INNER JOIN 
                    author ON author.id = article.author_id 
                WHERE 
                    slug = "${req.params.slug}"
                `
    con.query(query, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.render("article", {article: result})
    })
}

module.exports = {
    getAllArticles,
    getArticleBySlug
}