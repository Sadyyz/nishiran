"use server";

import { createClient } from "../../lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CATEGORIES = ["Notícias", "Entrevistas", "Colunas", "Comunidade"];

function parseBody(raw) {
  return raw
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function readForm(formData) {
  return {
    slug: (formData.get("slug") || "").toString().trim(),
    category: (formData.get("category") || "").toString(),
    title: (formData.get("title") || "").toString().trim(),
    subtitle: (formData.get("subtitle") || "").toString().trim(),
    author: (formData.get("author") || "").toString().trim(),
    article_date: (formData.get("article_date") || "").toString().trim(),
    read_time: (formData.get("read_time") || "4 min").toString().trim(),
    seal: (formData.get("seal") || "報").toString().trim().slice(0, 2),
    body: parseBody((formData.get("body") || "").toString()),
  };
}

function validate(fields) {
  if (!fields.slug) return "O identificador da URL (slug) é obrigatório.";
  if (!/^[a-z0-9-]+$/.test(fields.slug))
    return "O slug só pode ter letras minúsculas, números e hífen (sem espaço ou acento).";
  if (!CATEGORIES.includes(fields.category)) return "Escolha uma categoria válida.";
  if (!fields.title) return "O título é obrigatório.";
  if (!fields.author) return "O nome do repórter é obrigatório.";
  if (fields.body.length === 0) return "Escreva pelo menos um parágrafo no corpo da matéria.";
  return null;
}

const MAX_MEDIA_BYTES = 25 * 1024 * 1024; // 25MB

// Envia a foto/vídeo da manchete pro Storage do Supabase e devolve a URL pública.
// Retorna null se nenhum arquivo foi selecionado no formulário.
async function uploadMedia(supabase, formData) {
  const file = formData.get("media_file");
  if (!file || typeof file === "string" || file.size === 0) return null;

  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  if (!isImage && !isVideo) {
    throw new Error("O arquivo precisa ser uma imagem ou um vídeo.");
  }
  if (file.size > MAX_MEDIA_BYTES) {
    throw new Error("O arquivo precisa ter no máximo 25MB.");
  }

  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("article-media")
    .upload(path, file, { contentType: file.type });

  if (error) throw new Error("Falha ao enviar o arquivo: " + error.message);

  const { data } = supabase.storage.from("article-media").getPublicUrl(path);

  return { media_url: data.publicUrl, media_type: isImage ? "image" : "video" };
}

export async function createArticle(prevState, formData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const fields = readForm(formData);
  const validationError = validate(fields);
  if (validationError) return { error: validationError };

  let media = null;
  try {
    media = await uploadMedia(supabase, formData);
  } catch (e) {
    return { error: e.message };
  }

  const { error } = await supabase.from("articles").insert({
    ...fields,
    ...(media || {}),
    created_by: user.id,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "Já existe uma matéria com esse slug. Escolha outro." };
    }
    return { error: "Não foi possível publicar: " + error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateArticle(id, prevState, formData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const fields = readForm(formData);
  const validationError = validate(fields);
  if (validationError) return { error: validationError };

  let media = null;
  try {
    media = await uploadMedia(supabase, formData);
  } catch (e) {
    return { error: e.message };
  }

  const { error } = await supabase
    .from("articles")
    .update({ ...fields, ...(media || {}) })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { error: "Já existe uma matéria com esse slug. Escolha outro." };
    }
    return { error: "Não foi possível salvar: " + error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/articles/${fields.slug}`);
  redirect("/admin");
}

export async function deleteArticle(formData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const id = formData.get("id");
  await supabase.from("articles").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function setFeatured(formData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const id = formData.get("id");
  // só uma matéria pode ser a manchete por vez
  await supabase.from("articles").update({ featured: false }).neq("id", id);
  await supabase.from("articles").update({ featured: true }).eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
