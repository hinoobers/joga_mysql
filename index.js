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
app.use("/author", require("./routes/author"))

app.listen(3000, () => {
    console.log("Listening on port 3000")
});