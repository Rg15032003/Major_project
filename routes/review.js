const express=require("express");
const router=express.Router({mergeParams:true}); //conflicting route names of parent and child
const wrapAsync= require("../utils/wrapAsync.js");
const Expresserror=require("../utils/Expresserror.js");
const {validatereview,isLogged,isReviewAuthor}=require("../middleware.js")
const Review=require("../models/review.js"); 
const Listing=require("../models/listing.js");
const Reviewcontroller=require("../controllers/review.js");

//Reviews
//post route
router.post("/",isLogged,validatereview,wrapAsync(Reviewcontroller.createreview));

//Delete Route
router.delete("/:reviewId",isLogged,isReviewAuthor,wrapAsync(Reviewcontroller.destroyreview));

module.exports=router;