var mongoose  = require("mongoose");

var ShowSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    video: String,
    url: String,
    vote: Number
  }
);

mongoose.model("Show", ShowSchema);
mongoose.connect("mongodb://vote-funny-backend.herokuapp.com/");

module.exports = mongoose;
