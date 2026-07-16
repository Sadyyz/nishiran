"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { slugify } from "../../lib/slugify";
import MediaEmbed from "../MediaEmbed";

const CATEGORIES = ["Notícias", "Entrevistas", "Colunas", "Comunidade"];

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-ink text-paper font-body font-bold py-2 px-6 hover:bg-hanko transition-colors disabled:opacity-50 w-fit"
    >
      {pending ? "Salvando..." : label}
    </button>
  );
}

export default function ArticleForm({ action, initial, submitLabel }) {
  const [state, formAction] = useFormState(action, { error: null });
  const [slug, setSlug] = useState(initial?.slug || "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [photoPreview, setPhotoPreview] = useState(null);
  const [videoUrl, setVideoUrl] = useState(
    initial?.media_type === "video" ? initial?.media_url || "" : ""
  );

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) {
      setPhotoPreview(null);
      return;
    }
    setPhotoPreview(URL.createObjectURL(file));
  }

  function handleTitleChange(e) {
    if (!slugTouched) {
      setSlug(slugify(e.target.value));
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-5 max-w-2xl">
      {state?.error && (
        <p className="text-sm font-body text-hanko border border-hanko/40 bg-hanko/5 px-3 py-2">
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-xs font-mono uppercase tracking-wide text-navy">
          Título
        </label>
        <input
          name="title"
          required
          defaultValue={initial?.title}
          onChange={handleTitleChange}
          className="border border-paperDark bg-white px-3 py-2 text-base font-display outline-none focus:border-hanko"
          placeholder="Ex: Festival Cultural bate recorde de participantes"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-mono uppercase tracking-wide text-navy">
          URL da matéria (slug)
        </label>
        <input
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlug(slugify(e.target.value));
            setSlugTouched(true);
          }}
          className="border border-paperDark bg-white px-3 py-2 text-sm font-mono outline-none focus:border-hanko"
          placeholder="festival-cultural-bate-recorde"
        />
        <span className="text-xs font-body text-navy">
          Vai virar o endereço: /articles/{slug || "..."}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-mono uppercase tracking-wide text-navy">
          Subtítulo / linha de apoio
        </label>
        <textarea
          name="subtitle"
          rows={2}
          defaultValue={initial?.subtitle}
          className="border border-paperDark bg-white px-3 py-2 text-sm font-body outline-none focus:border-hanko resize-none"
          placeholder="Uma frase que resume a matéria e aparece abaixo do título."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-mono uppercase tracking-wide text-navy">
            Categoria
          </label>
          <select
            name="category"
            required
            defaultValue={initial?.category || CATEGORIES[0]}
            className="border border-paperDark bg-white px-3 py-2 text-sm font-body outline-none focus:border-hanko"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-mono uppercase tracking-wide text-navy">
            Selo (1 caractere/kanji)
          </label>
          <input
            name="seal"
            maxLength={2}
            defaultValue={initial?.seal || "報"}
            className="border border-paperDark bg-white px-3 py-2 text-sm font-body outline-none focus:border-hanko"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-mono uppercase tracking-wide text-navy">
            Repórter (autor)
          </label>
          <input
            name="author"
            required
            defaultValue={initial?.author}
            className="border border-paperDark bg-white px-3 py-2 text-sm font-body outline-none focus:border-hanko"
            placeholder="Nome do personagem/repórter"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-mono uppercase tracking-wide text-navy">
            Data (texto livre)
          </label>
          <input
            name="article_date"
            required
            defaultValue={initial?.article_date}
            className="border border-paperDark bg-white px-3 py-2 text-sm font-body outline-none focus:border-hanko"
            placeholder="Ex: 12 de agosto"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-mono uppercase tracking-wide text-navy">
          Tempo de leitura
        </label>
        <input
          name="read_time"
          defaultValue={initial?.read_time || "4 min"}
          className="border border-paperDark bg-white px-3 py-2 text-sm font-body outline-none focus:border-hanko max-w-[160px]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-mono uppercase tracking-wide text-navy">
          Foto da matéria
        </label>
        <span className="text-xs font-body text-navy mb-1">
          Aparece na matéria, no card de listagem e na manchete (se for o caso). Opcional — até 50MB.
        </span>
        <input
          type="file"
          name="media_file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="text-sm font-body file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-ink file:text-paper file:font-bold file:cursor-pointer border border-paperDark bg-white px-2 py-2"
        />

        {photoPreview ? (
          <img
            src={photoPreview}
            alt="Pré-visualização"
            className="mt-2 max-h-64 object-cover border border-paperDark"
          />
        ) : initial?.media_type === "image" && initial?.media_url ? (
          <div className="mt-2">
            <span className="text-xs font-body text-navy block mb-1">Foto atual:</span>
            <img src={initial.media_url} alt="Foto atual" className="max-h-64 object-cover border border-paperDark" />
            <span className="text-xs font-body text-navy block mt-1">
              Escolha um novo arquivo acima pra substituir.
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-mono uppercase tracking-wide text-navy">
          Link do vídeo
        </label>
        <span className="text-xs font-body text-navy mb-1">
          Cole o link de um vídeo já hospedado em algum lugar — anexo do Discord, YouTube,
          Streamable, Medal etc. Não faz upload, então não conta no espaço do site.
          Se preenchido, substitui a foto acima nessa matéria.
        </span>
        <input
          type="text"
          name="video_url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://cdn.discordapp.com/attachments/.../video.mp4"
          className="border border-paperDark bg-white px-3 py-2 text-sm font-body outline-none focus:border-hanko"
        />

        {videoUrl && (
          <div className="mt-2 max-w-md">
            <span className="text-xs font-body text-navy block mb-1">Pré-visualização:</span>
            <MediaEmbed mediaUrl={videoUrl} mediaType="video" className="w-full" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-mono uppercase tracking-wide text-navy">
          Corpo da matéria
        </label>
        <span className="text-xs font-body text-navy mb-1">
          Separe os parágrafos deixando uma linha em branco entre eles.
        </span>
        <textarea
          name="body"
          required
          rows={12}
          defaultValue={initial?.body?.join("\n\n")}
          className="border border-paperDark bg-white px-3 py-2 text-[15px] font-body leading-relaxed outline-none focus:border-hanko"
          placeholder={"Primeiro parágrafo da matéria...\n\nSegundo parágrafo...\n\nTerceiro parágrafo..."}
        />
      </div>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
