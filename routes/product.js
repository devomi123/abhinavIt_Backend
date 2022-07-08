var express = require("express");
const router = express.Router();

const Product = require("../models/Product");

router.post("/save", async (req, res) => {
    let body = req.body;
    let product = new Product();
    if (body.data.id != "") {
        product = await Product.findById(body.data.id);
    }
    product.name = body.data.name;
    product.description = body.data.description;
    product.stock_level = body.data.stock_level;
    product.email = body.data.email;
    product.price = body.data.price;
    product.sku = body.data.sku;

    product.save().then(result => {
        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));

    });
});


router.post("/list", async (req, res) => {
    let product = await Product.find();
    res.json({ data: product });

});

router.post("/delete", async (req, res) => {
    let body = req.body;
    let product = await Product.findByIdAndDelete(body.data.id);

    let data = {
        "data": {
            "status": "success"
        }
    }

    res.end(JSON.stringify(data));

});

router.post("/get", async (req, res) => {
    let body = req.body
    let product = await Product.findById(body.data.id);
    res.json({ data: product });

});

router.post("/findnew", async (req, res) => {
    let body = req.body
    let product = await Product.find({"id":body.data.id});
    res.json({ data: product });

});

router.post("/updatestock", async (req, res) => {
    let body = req.body;
    let product = Product();
    product = await Product.findById(body.data.id);
    product.instock = body.data.instock;

    product.save().then(result=>{
        res.end(JSON.stringify(result));
    },err=>{
        res.end(JSON.stringify(err));
    });

    res.json({ data: product });

});


module.exports = router;
