const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listingcontroller=require("../controllers/listing.js")
const Listing = require("../models/listing.js");
const { isLogged, isOwner, validatelisting } = require("../middleware.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage })

router.route("/")
.get( wrapAsync(Listingcontroller.index))
.post(
  isLogged,
  upload.single('listing[image]'), //to upload single image in the backend through multer
  validatelisting,
  wrapAsync(Listingcontroller.createlist));

router.get("/new", isLogged, Listingcontroller.rendernewform);

//show route
router.route("/:id")
.get(
  wrapAsync(Listingcontroller.showlist))
.put(
  isLogged,
  isOwner,
  upload.single('listing[image]'),
  validatelisting,
  wrapAsync(Listingcontroller.updatelist)
)
.delete(
  isLogged,
  isOwner,
  wrapAsync(Listingcontroller.deletelist)
);

router.get(
  "/:id/edit",
  isLogged,
  isOwner,
  wrapAsync(Listingcontroller.editlist));


module.exports = router;
