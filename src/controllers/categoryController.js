import { CategoryModel } from "../models/categoryModel.js";

// Pesan error kalau nama kategori sudah dipakai (kolom name di database unique)
function friendlyError(err) {
  if (err.code === "23505") return "Nama kategori sudah ada";
  return err.message;
}

export const CategoryController = {
  async getAll(req, res) {
    try {
      const categories = await CategoryModel.getAll();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const category = await CategoryModel.getById(req.params.id);
      res.json(category);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const name = req.body.name?.trim();
      if (!name) {
        return res.status(400).json({ error: "Nama kategori wajib diisi" });
      }
      const category = await CategoryModel.create(name);
      res.status(201).json(category);
    } catch (err) {
      res.status(400).json({ error: friendlyError(err) });
    }
  },

  async update(req, res) {
    try {
      const name = req.body.name?.trim();
      if (!name) {
        return res.status(400).json({ error: "Nama kategori wajib diisi" });
      }
      const category = await CategoryModel.update(req.params.id, name);
      res.json(category);
    } catch (err) {
      res.status(400).json({ error: friendlyError(err) });
    }
  },

  async remove(req, res) {
    try {
      const result = await CategoryModel.remove(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};