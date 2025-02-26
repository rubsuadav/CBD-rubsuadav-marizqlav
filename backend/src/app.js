import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Hello, world!");
})

export default app;