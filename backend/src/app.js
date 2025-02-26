import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Hello, world!");
})

app.use("/api", userRoutes);
app.use("/api", taskRoutes);


export default app;