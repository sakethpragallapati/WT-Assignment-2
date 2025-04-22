import mongoose from "mongoose";

const dbConnection = async () => {
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Database is connected successfully!!");
    }).catch((error)=>{
        `Something went wrong please try again... ${error}`
    });
}

export default dbConnection;