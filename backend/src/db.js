import mongoose from "mongoose";

// local imports
import { DB_NAME, MONGODB_URI } from "./config.js";
import { createCollectionsFromDatabase } from "./utils/utils.js";

const connection = mongoose.connection;

export async function connectToDatabase() {
    console.log(DB_NAME, MONGODB_URI);
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: DB_NAME,
        });
        console.log(`Connected to database ${connection.db.databaseName}`);
        await createCollectionsFromDatabase();

    } catch (error) {
        console.error("Error connecting to database: ", error.message);
    }
}