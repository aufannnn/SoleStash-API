import express from "express";
import { SneakerController } from "../controllers/sneakerController.js";

const router = express.Router();

router.get("/", SneakerController.getAll);
router.get("/:id", SneakerController.getById);
router.post("/", SneakerController.create);
router.put("/:id", SneakerController.update);
router.delete("/:id", SneakerController.remove);

export default router;