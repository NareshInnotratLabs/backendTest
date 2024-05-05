import express from "express";
import * as dotenv from "dotenv";
dotenv.config()
import connectDB from "./connectDB.js";
import cors from "cors";
import users from "./routes/userRoutes.js";
import interview from "./routes/interviewRoutes.js";


const app = express();
const PORT = 4000;

app.use(express.json())
app.use(cors())

app.get("/", function (req, res) {
    res.status(200).send("Hello World")
})

app.use("/user", users);
app.use("/interview", interview);

const startserver = async () => {
    await connectDB();
    //  starting server
    app.listen(PORT, () => {
        console.log(`Server Run at ${PORT}`);
    });
};
startserver();
