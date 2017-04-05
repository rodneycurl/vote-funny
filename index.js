var express = require("express");
var parser  = require("body-parser");
var hbs     = require("express-handlebars");
var mongoose = require("./db/connection");
// var mongoose = require("https://vote-funny-backend.herokuapp.com/")

var app     = express();

var Show = mongoose.model("Show");

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
app.use("/scripts", express.static("node_modules"));
app.use(parser.json({extended: true}));

app.get("/", function(req, res){
  res.render("shows");
});

app.get("/api/shows", function(req, res){
  Show.find({}).then(function(shows){
    res.json(shows)
    });
  });

app.get("/api/shows/:name", function(req, res){
  Show.findOne({name: req.params.name}).then(function(show){
    res.json(show)
    });
  });

app.post("/api/shows", function(req, res){
  Show.create(req.body).then(function(show){
    res.json(show)
  })
});

app.delete("/api/shows/:name", function(req, res){
  Show.findOneAndRemove({name: req.params.name}).then(function(show){
    res.json({ success: true })
  })
});

app.put("/api/shows/:name", function(req, res){
  Show.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).then(function(show){
    res.json(show)
  })
})

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});
