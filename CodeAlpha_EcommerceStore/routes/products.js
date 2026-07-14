const router = require("express").Router();
const Product = require("../models/Product");

const seed = [
  { name:"Wireless Headphones", price:2499, category:"Electronics", description:"Comfortable wireless headphones with clear sound.", image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" },
  { name:"Smart Watch", price:3499, category:"Electronics", description:"Smart fitness watch with activity tracking.", image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" },
  { name:"Running Shoes", price:1999, category:"Fashion", description:"Lightweight everyday running shoes.", image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
  { name:"Backpack", price:1299, category:"Fashion", description:"Spacious backpack for college and travel.", image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600" },
  { name:"Laptop Stand", price:999, category:"Accessories", description:"Ergonomic stand for laptops and notebooks.", image:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600" },
  { name:"Coffee Mug", price:499, category:"Home", description:"Minimal ceramic coffee mug.", image:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600" }
];

router.get("/", async (req, res) => {
  if (await Product.countDocuments() === 0) await Product.insertMany(seed);
  res.json(await Product.find());
});
router.get("/:id", async (req, res) => res.json(await Product.findById(req.params.id)));
module.exports = router;