import app from "./app.js";
import { PORT } from "./config.js";
import { connectToDatabase } from "./db.js";

connectToDatabase();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});