// Detecta o tipo de link de vídeo e devolve a forma certa de exibir.
// - Link direto de arquivo (.mp4, .webm, .mov, .m4v) -> <video> nativo.
//   Cobre anexos do Discord, links diretos, etc.
// - YouTube (link normal ou youtu.be) -> iframe de embed oficial.
// - Medal.tv (link de compartilhamento) -> convertido pro formato de embed deles.
// - Qualquer outro link (Streamable, Twitch clip, etc.) -> iframe genérico.
function getVideoEmbed(url) {
  const directFile = /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url);
  if (directFile) return { kind: "file", src: url };

  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]+)/
  );
  if (ytMatch) {
    return { kind: "iframe", src: `https://www.youtube.com/embed/${ytMatch[1]}` };
  }

  // Link de compartilhamento do Medal: medal.tv/games/{jogo}/clips/{id}/{slug}?invite=...
  // Precisa virar o formato de embed: medal.tv/games/{jogo}/clip/{id} (sem slug, sem invite)
  const medalMatch = url.match(/medal\.tv\/games\/([^/]+)\/clips?\/([a-zA-Z0-9]+)/);
  if (medalMatch) {
    const [, game, id] = medalMatch;
    return { kind: "iframe", src: `https://medal.tv/games/${game}/clip/${id}` };
  }

  return { kind: "iframe", src: url };
}

export default function MediaEmbed({ mediaUrl, mediaType, className = "" }) {
  if (!mediaUrl) return null;

  if (mediaType === "image") {
    return <img src={mediaUrl} alt="" className={className} />;
  }

  const embed = getVideoEmbed(mediaUrl);

  if (embed.kind === "file") {
    return <video src={embed.src} controls className={className} />;
  }

  return (
    <div className={`${className} relative`} style={{ aspectRatio: "16 / 9" }}>
      <iframe
        src={embed.src}
        className="absolute inset-0 w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
