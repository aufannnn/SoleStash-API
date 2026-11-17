import { BrandModel } from "../models/brandModel.js";

// Ambil kolom yang boleh diisi aja, string kosong diubah jadi null
const FIELDS = ["name", "country", "founded_year", "logo_url", "description"];

function cleanPayload(body) {
  const payload = {};
  for (const key of FIELDS) {
    if (body[key] !== undefined) {
      payload[key] = body[key] === "" ? null : body[key];
    }
  }
  return payload;
}

export const BrandController = {
  async getAll(req, res) {
    try {
      const brands = await BrandModel.getAll();
      res.json(brands);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const brand = await BrandModel.getById(req.params.id);
      res.json(brand);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const payload = cleanPayload(req.body);
      if (!payload.name) {
        return res.status(400).json({ error: "Nama brand wajib diisi" });
      }
      const brand = await BrandModel.create(payload);
      res.status(201).json(brand);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const payload = cleanPayload(req.body);
      if (payload.name === null) {
        return res.status(400).json({ error: "Nama brand wajib diisi" });
      }
      const brand = await BrandModel.update(req.params.id, payload);
      res.json(brand);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await BrandModel.remove(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};