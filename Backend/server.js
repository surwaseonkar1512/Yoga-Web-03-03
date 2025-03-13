const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");
const NutritionRoutes = require("./routes/NutritionRoutes");
const yogaRoutes = require("./routes/yogaRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/user");
const contactUsRoute = require("./routes/Contact");
const profileRoutes = require("./routes/profile");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");

dotenv.config();
const app = express();

// Enable CORS
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
cloudinaryConnect();

// OR configure CORS (if you want to allow specific origins)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://yoga-web-03-03-amlx.vercel.app/",
    ], // Add allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/nutrition", NutritionRoutes);
app.use("/api/reach", contactUsRoute);
app.use("/api/yogas", yogaRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/profile", profileRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
