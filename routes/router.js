const express = require("express");
const { VideoController } = require("../controllers/controller");
const path = require("path");
const multer = require("multer");
const Router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!require("fs").existsSync(path.resolve(__dirname, "../uploads"))) {
      require("fs").mkdirSync(path.resolve(__dirname, "../uploads"));
    }
    cb(null, path.resolve(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.fieldname + ".mp4");
  },
});

const upload = multer({ storage: storage });
Router.post("/video", upload.single("video"), VideoController);
module.exports = Router;
