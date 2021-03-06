var express = require("express");
var body_parser = require("body-parser");
var mongoose = require("mongoose");

var app = express();


app.use(body_parser.json({limit:'50mb'}));
app.use(body_parser.urlencoded({limit:'50mb', extended: true}));

app.use(express.static("assets"));


mongoose.connect("mongodb://localhost:27017/Product");
const db = mongoose.connection;
db.on("error", error=> console.log(error));
db.on("open", ()=> console.log("Connection Established"));



app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method == "OPTIONS") {

        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();

});

app.get("/",function(req,res){
    res.send("hello welcome");
    res.end();
})

app.use("/product", require("./routes/product"));

const  PORT = process.env.PORT || 8081;

app.listen(PORT,function(){
    console.log("website is running...");
})