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

const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({extended: true}))

const con = require("./utils/db");
con.connect(function(err) {
    if(err) throw err;
    console.log("Connected to database!");
})

const articleRoutes = require("./routes/article")

app.use("/", articleRoutes)
app.use("/article", articleRoutes)

app.get("/author/:slug", (req, res) => {
    const authorId = req.params.slug;

    con.query(`SELECT * FROM author WHERE id=${authorId}`, (err, ress) => {
        con.query(`SELECT * FROM article WHERE author_id=${authorId}`, (err2, ress2) => {
            // ress2.forEach(e => {
            //     e.author = {}
            //     e.author.name = ress[0].name;
            //     e.author.id = ress[0].id
            // })
            console.log("test", ress[0]);
            res.render("author", {articles: ress2, author: ress[0]})
        })
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
});