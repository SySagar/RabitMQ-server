import express from "express";
import queueRoutes from "./routes/messageQueue.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 4001;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(queueRoutes);

app.use(
  cors({
    origin: "*",
  })
);

// app.get("/send-msg", (req, res) => {
//     const data = {
//         title: "Six of Crows",
//         author: "Leigh Burdugo"
//     }

//     console.log("A message is sent to queue")
//     res.send("Message Sent");

// })

app.listen(PORT, () => console.log("Server running at port " + PORT));
