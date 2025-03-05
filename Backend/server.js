const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/user");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/auth", userRoutes);

app.use("/api/categories", categoryRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
