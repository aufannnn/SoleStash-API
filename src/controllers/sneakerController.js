import { SneakerModel } from "../models/sneakerModel.js";

// Ambil kolom yang boleh diisi aja, string kosong diubah jadi null
const FIELDS = ["name", "brand_id", "category_id", "colorway", "sizes", "price", "release_date", "image_url", "description"];

function cleanPayload(body) {
  const payload = {};
  for (const key of FIELDS) {
    if (body[key] !== undefined) {
      payload[key] = body[key] === "" ? null : body[key];
    }
  }
  return payload;
}

// Ukuran wajib angka yang dipisah koma, contoh: "39, 40, 41" (boleh setengah: "42.5")
const SIZES_PATTERN = /^\d{1,2}(\.5)?(\s*,\s*\d{1,2}(\.5)?)*$/;

// Cek format ukuran, lalu rapikan jadi "39, 40, 41". Return null kalau formatnya salah.
function normalizeSizes(sizes) {
  const text = String(sizes).trim();
  if (!SIZES_PATTERN.test(text)) return null;
  return text.split(",").map((s) => s.trim()).join(", ");
}

const SIZES_ERROR = "Format ukuran salah. Pisahkan dengan koma, contoh: 39, 40, 41";

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
      if (payload.sizes) {
        payload.sizes = normalizeSizes(payload.sizes);
        if (!payload.sizes) return res.status(400).json({ error: SIZES_ERROR });
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
      if (payload.sizes) {
        payload.sizes = normalizeSizes(payload.sizes);
        if (!payload.sizes) return res.status(400).json({ error: SIZES_ERROR });
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