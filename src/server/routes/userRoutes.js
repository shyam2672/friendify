const router = require("express").Router();
const userctrl = require("../controllers/userController.js");
// const protect = require("../middlewares/authmiddleware");

router.post("/register", userctrl.register);
router.post("/login", userctrl.login);
router.post("/friends", userctrl.getfriends);
router.post("/addfriend", userctrl.addfriend);
router.post("/getuserinfo", userctrl.getuserinfo);
router.post("/setrandomusername", userctrl.setrandomusername);
router.post("/rateuser", userctrl.rateuser);
router.post("/getrating", userctrl.getrating);
router.post("/deletefriend", userctrl.deletefriend);

// router.get("/verify/:id", userctrl.verify);

module.exports = router;