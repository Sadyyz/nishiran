import Link from "next/link";
import Seal from "./Seal";
import MediaEmbed from "./MediaEmbed";

export default function Hero({ a }) {
  return (
    <Link
      href={`/articles/${a.slug}`}
      className="text-left block w-full px-5 md:px-10 py-8 border-b-2 border-ink"
    >
      {a.media_url && (
        <div className="mb-5 -mx-5 md:-mx-10">
          <MediaEmbed
            mediaUrl={a.media_url}
            mediaType={a.media_type}
            className="w-full max-h-[420px] object-cover"
          />
        </div>
      )}


      <div className="flex items-start gap-5">
        <Seal ch={a.seal} size={56} />
        <div className="flex-1">
          <div className="text-[11px] tracking-widest uppercase mb-2 font-mono text-hanko">
            Manchete · {a.category}
          </div>
          <h2 className="text-3xl md:text-5xl leading-[1.05] mb-3 hover:underline font-display font-extrabold text-ink">
            {a.title}
          </h2>
          <p className="text-base max-w-2xl mb-3 font-body text-[#4A4033]">
            {a.subtitle}
          </p>
          <div className="flex items-center gap-2 text-xs font-body text-navy">
            <span>{a.author}</span>
            <span>·</span>
            <span>{a.article_date}</span>
            <span>·</span>
            <span>{a.read_time} de leitura</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
