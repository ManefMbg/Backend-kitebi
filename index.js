import express from "express";
import dotenv from "dotenv";
import Connection from "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AuthRouter } from "./routes/auth.js";
import { UserRouter } from "./routes/userRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());
Connection();


app.use("/auth", AuthRouter);
app.use("/api/user", UserRouter);

app.use((req,res)=>{
  res.send("API is running...")
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server is Running");
});