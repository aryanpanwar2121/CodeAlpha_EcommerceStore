const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });
    res.json({ message: "Registration successful" });
  } catch (e) { res.status(500).json({ message: "Registration failed" }); }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return res.status(401).json({ message: "Invalid email or password" });
  req.session.user = { id: user._id.toString(), name: user.name, email: user.email };
  res.json({ message: "Login successful", user: req.session.user });
});

router.post("/logout", (req, res) => req.session.destroy(() => res.json({ message: "Logged out" })));
router.get("/me", (req, res) => res.json({ user: req.session.user || null }));
module.exports = router;