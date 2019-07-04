const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Admin:5t6y7u8iYKF!@cluster0-mhbxn.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.log("Connected to DB!");
}).catch(err => {
  console.log("ERROR: ", err.message);
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})
const Blog = mongoose.model("Blog", blogSchema);

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

app.get("/blogs/new", (req, res) => {
    res.render("new");
});

app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

app.post("/blogs", (req, res) => {
    let data = req.body.blog;
    Blog.create(data, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    })
})

app.listen(3000, () => {
    console.log("Blog App Listening on Port 3000!!!");
})

    

    