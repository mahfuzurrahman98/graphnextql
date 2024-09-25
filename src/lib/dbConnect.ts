import mongoose from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI!;

if (!MONGO_URI) {
    throw new Error(
        "Please define the MONGO_URI environment variable inside .env.local"
    );
}

const cached: {
    connection?: typeof mongoose;
    promise?: Promise<typeof mongoose>;
} = {};

/**
 * Connect to MongoDB.
 * Optimized for both serverless and traditional environments by caching the connection.
 */
async function connectMongo() {
    // Reuse existing connection if available
    if (cached.connection) {
        console.log("Using existing MongoDB connection.");
        return cached.connection;
    }

    // If no ongoing connection attempt, start one
    if (!cached.promise) {
        console.log("Creating new MongoDB connection...");
        const opts = {
            bufferCommands: false, // Prevent mongoose from buffering commands
        };
        cached.promise = mongoose.connect(MONGO_URI, opts);
    }

    try {
        // Await the connection promise and cache the result
        cached.connection = await cached.promise;
        console.log("MongoDB connected successfully.");
    } catch (error: any) {
        console.error("Error connecting to MongoDB:", error);
        cached.promise = undefined; // Reset promise to allow retry on failure
        throw error;
    }

    return cached.connection;
}

export default connectMongo;
