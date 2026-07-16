import Link from "next/link";
import MediaEmbed from "./MediaEmbed";

export default function ArticleCard({ a, compact }) {
  return (
    <Link
      href={`/articles/${a.slug}`}
      className="text-left group flex flex-col gap-2 pb-5 border-b border-paperDark"
    >
      {a.media_url && (
        <div className={`mb-1 overflow-hidden ${compact ? "max-h-32" : "max-h-56"}`}>
          <MediaEmbed
            mediaUrl={a.media_url}
            mediaType={a.media_type}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="text-[11px] tracking-widest uppercase flex items-center gap-2 font-mono text-hanko">
        <span>{a.category}</span>
        <span className="text-gold">·</span>
        <span className="text-navy">{a.read_time}</span>
      </div>
      <h3
        className={`${
          compact ? "text-lg" : "text-2xl"
        } leading-snug group-hover:underline font-display font-bold text-ink`}
      >
        {a.title}
      </h3>
      {!compact && (
        <p className="text-sm leading-relaxed font-body text-[#4A4033]">
          {a.subtitle}
        </p>
      )}
      <div className="flex items-center gap-2 mt-1 text-xs font-body text-navy">
        <span>{a.author}</span>
        <span>·</span>
        <span>{a.article_date}</span>
      </div>
    </Link>
  );
}
