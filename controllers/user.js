const User = require("../models/user.js");

module.exports.rendersignup=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.aftersign=async(req,res)=>{
    try {
    let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const reguser=await User.register(newUser,password);
    req.login(reguser,(err)=>{
        if(err) {
            return next(err);
        }
        req.flash("success","Welcome to Wanderlust!");
        res.redirect(res.locals.redirectUrl || "/listings");
    });
    } catch(e) {
        req.flash("error",e.message)
        res.redirect("/signup")
    }
}

module.exports.renderlogin=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.afterlogin=async(req,res)=>{
    req.flash("success","Welcome to wanderlust!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err) {
            return next(err);
        }
        req.flash("success","logged out");
        res.redirect("listings");
    })
}