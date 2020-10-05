const { Router } = require("express");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const Axios = require("axios").default;

const router = Router();

router.post("/add", auth, async (req, res) => {
  try {
    console.log(req.user);
    if (req.body.qrcode !== "coding is easy") {
      return res.status(401).json({
        message: "WRONG QR-CODE!",
      });
    }
    await Axios.post(
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLScSFTODP2wz7lP-s-DJraOJO6NngkX8eL5-RH4DoYi4QTnMOw/formResponse",
      new URLSearchParams({
        "entry.843509151": req.body.qrcode,
        "entry.1694132655": req.user.email,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    res.send("Hello");
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "SERVER ERROR",
    });
  }
});

module.exports = router;
