if(process.env.NODE_ENV!="production") {
require('dotenv').config();
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride = require("method-override");
const ejs_mate=require("ejs-mate");
const wrapAsync= require("./utils/wrapAsync.js");
const Expresserror=require("./utils/Expresserror.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const localStratergy=require("passport-local");
const MongoStore=require("connect-mongo");
const User=require("./models/user.js");
const Listing=require("./models/listing.js");


const listings=require("./routes/listing.js")
const reviews=require("./routes/review.js")
const user=require("./routes/user.js")


const dbURL=process.env.ATLASDB_URL;

main().then(()=>{
    console.log('connection working');
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(dbURL);
};


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true})); //all data that comes can be parsed
app.use(methodOverride('_method'));
app.engine("ejs",ejs_mate);
app.use(express.static(path.join(__dirname,"public")));

const store=MongoStore.create({
    mongoUrl:dbURL,
    crypto: {
        secret:process.env.SECRET,
    },
        touchAfter:24*3600,
    
})
store.on("error",()=>{
    console.log("Error in session store")
})

const sessionoptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:(Date.now()+ 7*24*60*60*1000),
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}

app.use(session (sessionoptions)); //middlewares
app.use(flash());

app.use(passport.initialize()); //initialises passport
app.use(passport.session()); //user identification from page to page
passport.use(new localStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curruser=req.user;
    console.log(req.user);
    next();
})

app.get("/demouser",async(req,res)=>{
    let fakeuser=new User ({
        email:"abc@gmail.com",
        username:"abc",
    });
   let newuser=await User.register(fakeuser,"helloworld");  //user,password
   res.send(newuser);   
})

app.use("/listings",listings); ///listings is the common route name to all routes and lisitngs is required to use in diff js file
app.use("/listings/:id/reviews",reviews);
app.use("/",user);


// app.get("/",(req,res)=>{
//     res.send("home route");
// });

// app.get("/", (req,res)=>{
//     res.redirect("/listings"); 
// });
app.get("/", async (req, res, next) => {
    try {
        const alllistings = await Listing.find({});
        res.render("listings/index.ejs", { alllistings });
    } catch (err) {
        next(err);
}
});

app.all(/.*/,(req, res, next) => {
    next(new Expresserror(404, "page not found!"));
});

app.use((err,req,res,next)=>{
    let{status=500,message="Something went Wrong"}=err;
    res.render("error.ejs",{message});
   // res.status(status).send(message);
});

app.listen("8080",(req,res)=>{
    console.log("APP LISTENING");
});