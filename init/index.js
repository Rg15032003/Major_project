const mongoose=require("mongoose");
const initdata=require("./data.js"); //require the data 
const Listing=require("../models/listing.js"); //collection

main().then(()=>{
    console.log('connection working');
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

const initdb=async ()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({
            ...obj,owner:"68861ef72579ccfb3a295f7e",
    }))
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
};

initdb();
 