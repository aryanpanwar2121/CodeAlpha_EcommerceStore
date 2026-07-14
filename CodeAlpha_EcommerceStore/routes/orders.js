const router = require("express").Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Please login first" });
  const order = await Order.create({
    userId: req.session.user.id,
    customerName: req.session.user.name,
    items: req.body.items,
    total: req.body.total
  });
  res.json({ message: "Order placed successfully", order });
});
router.get("/", async (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Please login first" });
  res.json(await Order.find({ userId: req.session.user.id }).sort({ createdAt: -1 }));
});
module.exports = router;