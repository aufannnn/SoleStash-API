import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import brandRoutes from "./routes/brandRoutes.js";
import sneakerRoutes from "./routes/sneakerRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();

app.use(cors()); // biar PWA (beda domain) boleh akses API ini
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "SoleStash API is running" });
});

app.use("/api/brands", brandRoutes);
app.use("/api/sneakers", sneakerRoutes);
app.use("/api/categories", categoryRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;