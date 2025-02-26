import { User } from "../models/Nueva.js";

async function createModels() {
    try {
        await User.createCollection();
        console.log("Collections created successfully");
    } catch (error) {
        console.error(`Error creating models: ${error.message}`);
    }
}

export async function createCollectionsFromDatabase() {
    try {
        await createModels();
    } catch (error) {
        console.error(`Error creating collections from database: ${error.message}`);
    }
}