import { SneakerModel } from "../models/sneakerModel.js";

// Ambil kolom yang boleh diisi aja, string kosong diubah jadi null
const FIELDS = ["name", "brand_id", "category_id", "colorway", "price", "release_date", "image_url", "description"];

function cleanPayload(body) {
  const payload = {};
  for (const key of FIELDS) {
    if (body[key] !== undefined) {
      payload[key] = body[key] === "" ? null : body[key];
    }
  }
  return payload;
}

export const SneakerController = {
  async getAll(req, res) {
    try {
      // contoh: /api/sneakers?search=dunk
      const sneakers = await SneakerModel.getAll(req.query);
      res.json(sneakers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const sneaker = await SneakerModel.getById(req.params.id);
      res.json(sneaker);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const payload = cleanPayload(req.body);
      if (!payload.name) {
        return res.status(400).json({ error: "Nama sneaker wajib diisi" });
      }
      const sneaker = await SneakerModel.create(payload);
      res.status(201).json(sneaker);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const payload = cleanPayload(req.body);
      if (payload.name === null) {
        return res.status(400).json({ error: "Nama sneaker wajib diisi" });
      }
      const sneaker = await SneakerModel.update(req.params.id, payload);
      res.json(sneaker);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await SneakerModel.remove(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};