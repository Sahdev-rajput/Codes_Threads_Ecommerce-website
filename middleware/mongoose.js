import mongoose from "mongoose";

const connectDb = (handler) => async (req, res) => {
    // Check if there is already a connection to the MongoDB
    if (mongoose.connections[0].readyState ) {
        // If there's an existing connection, proceed with handling the request
        return handler(req, res);
    }

    // If there's no existing connection, attempt to connect to the MongoDB
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
        return handler(req, res);
    } catch (error) {
        // If there's an error while connecting, handle it appropriately
        console.error("Error connecting to MongoDB:", error);
        res.status(500).json({ error: "Failed to connect to MongoDB" });
    }
};

export default connectDb;
