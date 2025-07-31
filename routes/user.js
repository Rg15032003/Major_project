const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const Usercontroller=require("../controllers/user.js");
const user = require("../models/user.js");
 
router.route("/signup")
.get(Usercontroller.rendersignup)
.post(saveRedirectUrl,wrapAsync(Usercontroller.aftersign));

router.route("/login")
.get(Usercontroller.renderlogin)
.post(passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),(Usercontroller.afterlogin));

router.get("/logout",Usercontroller.logout);
module.exports=router;