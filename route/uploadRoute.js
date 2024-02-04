const express = require("express");
const router = express();

const {
  importUser,
  getUserList,
  updateUserList,
  deleteUser,
} = require("../controller/userController");

const path = require("path");
const multer = require("multer");
router.use(express.static(path.resolve(__dirname, "public")));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

router.post("/importuser", upload.single("File"), importUser);
router.get("/getuserlist", getUserList);
router.put("/updateuserlist/:_id", updateUserList);
router.delete("/deleteuser/:_id", deleteUser);

module.exports = router;

// ------------------------------ [[ Handling unhandled route ]] ------------------------------   
router.all("/**", (req, res) => {
    return res.status(400).send({status: false, message: "Your API URL is wrong Please check Endpoint"})
});
