import { supabase } from "../config/supabaseClient.js";

export const SneakerModel = {
  async getAll({ search, brand_id, category_id } = {}) {
    let query = supabase
      .from("sneakers")
      .select("*, brands(id, name), categories(id, name)")
      .order("release_date", { ascending: false });

    if (search) query = query.ilike("name", `%${search}%`);
    if (brand_id) query = query.eq("brand_id", brand_id);
    if (category_id) query = query.eq("category_id", category_id);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("sneakers")
      .select("*, brands(id, name, country), categories(id, name)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from("sneakers")
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from("sneakers")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from("sneakers").delete().eq("id", id);
    if (error) throw error;
    return { message: "Sneaker deleted successfully" };
  },
};