import mongoose from "mongoose";


const connection = async () => {
    try{
        const db = mongoose.connect(process.env.URL)
        console.log("Connected")
        return db
    } catch(err) {
        console.log("Error: " + err)
    }
    
}

export default connection 