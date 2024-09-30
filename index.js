const express = require("express");
const app = express()

const path = require("path")
const hbs = require("express-handlebars");

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "hbs");
app.engine('hbs', hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts"
}))
console.log(__dirname + "/views/layouts")
app.use(express.static("public"))

const mysql = require("mysql2")

const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({extended: true}))

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
})

con.connect(function(err) {
    if(err) throw err;
    console.log("Connected to database!");
})

app.get("/", (req, res) => {
    let query = "SELECT * FROM article"
    let articles = []
    con.query(query, (err, result) => {
        if(err) throw err;
        articles = result;
        res.render("index", {articles});
    })
})

app.get("/article/:slug", (req, res) => {
    let query = `SELECT * FROM article WHERE slug='${req.params.slug}'`
    let article
    con.query(query, (err, articleResult) => {
        if(err) throw err;

        console.log(`SELECT * FROM author WHERE author_id=${articleResult[0].author_id}`)
        con.query(`SELECT * FROM author WHERE id='${articleResult[0].author_id}'`, (err, authorResult) => {
            const articleData = articleResult[0]
            const article = {
                name: articleData.name,
                published: articleData.published,
                image: articleData.image,
                body: articleData.body,
                author: {
                    name: authorResult[0].name // include the author's name here
                }
            }
            console.log(article);
            res.render('article', {article})
        });

    })
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
});