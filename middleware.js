 const Listing=require("./models/listing");
  const Review=require("./models/review");
 const Expresserror=require("./utils/Expresserror.js");
 const{listingSchema,reviewSchema}=require("./schema.js");
 
 module.exports.isLogged=(req,res,next)=> {
        if(!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in to authenticate");
        return res.redirect("/login");
}
next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
        if(req.session.redirectUrl) {
                res.locals.redirectUrl=req.session.redirectUrl;
        }
        next();
}

module.exports.isOwner=async(req,res,next)=>{
        let {id}=req.params;
        let listing=await Listing.findById(id);
        if(!listing.owner.equals(res.locals.curruser._id)) {
        req.flash('error',"You don't have the permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
        let {id, reviewId}=req.params;
        let review=await Review.findById(reviewId);
        if(!review.author.equals(res.locals.curruser._id)) {
        req.flash('error',"You don't have the permission to delete");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validatelisting=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error) {
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new Expresserror(400,errMsg);
    } else{
        next();
    }
}

module.exports.validatereview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error) {
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new Expresserror(400,errMsg);
    } else{
        next();
    }
}