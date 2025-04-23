import mongoose from "mongoose";

const dbConnection = async () => {
    mongoose.connect(process.env.MONGO_URL,{
        serverSelectionTimeoutMS: 30000, // 30s timeout
        socketTimeoutMS: 45000, // 45s idle timeout
        maxPoolSize: 10 // Better performance
      }).then(()=>{
        console.log("Database is connected successfully!!");
    }).catch((error)=>{
        `Something went wrong please try again... ${error}`
    });
}

export default dbConnection;