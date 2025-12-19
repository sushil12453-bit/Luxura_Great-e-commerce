import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "luxuraGreat", // optional but recommended
    });

    console.log("DB ✅ CONNECTED");
  } catch (error) {
    console.error("MongoDB Connection Failed ❌", error.message);
    throw error; // 🔥 important
  }
};

export default connectDB;

/*import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB ✅ CONNECTED");
  } catch (error) {
    console.log("MongoDB Error:", error.message);
  }
};

export default connectDB;*/
