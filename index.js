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

app.listen(3000, () => {
    console.log("Listening on port 3000")
});