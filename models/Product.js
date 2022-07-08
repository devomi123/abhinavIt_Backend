const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String
    },
    sku: {
        type: String       
    },
    description: {
        type: String
    },
    email: {
        type: String
    },
    price: {
        type: Number        
    },
    stock_level: {
        type: Number
    }

   
})

const Product = mongoose.model("products", schema);

module.exports = Product;
