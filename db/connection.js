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
// mongoose.connect("mongodb://localhost/votefunny");
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URL);
}else{
  mongoose.connect("mongodb://localhost/votefunny");
}
module.exports = mongoose;
