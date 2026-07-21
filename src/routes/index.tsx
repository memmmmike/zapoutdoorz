import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { ARTISTS, type Act, type Artist, type Category } from "@/data/lineup";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZAP Outdoorz 2026 — Lineup" },
      {
        name: "description",
        content:
          "Explore the ZAP Campout 2026 lineup. Stream every DJ, live act, and collective playing September 2026 before you arrive.",
      },
      { property: "og:title", content: "ZAP Outdoorz 2026 — Lineup" },
      {
        property: "og:description",
        content: "Year 4. Meet the lineup. Press play.",
      },
    ],
  }),
  component: LineupPage,
});

type Filter = "All" | Category;
const FILTERS: Filter[] = ["All", "DJs", "Live", "Collectives"];

function LineupPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Artist | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTISTS.filter((a) => {
      if (filter !== "All" && a.category !== filter) return false;
      if (q && !a.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filter, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <Intro />
      <section id="lineup" className="relative px-4 sm:px-8 lg:px-16 pb-32">
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          query={query}
          setQuery={setQuery}
          count={visible.length}
        />
        <ArtistGrid artists={visible} onSelect={setSelected} />
      </section>
      <Footer />
      {selected && <ArtistModal artist={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

function Hero() {
  return (
    <section className="relative grain min-h-screen w-full overflow-hidden">
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover scale-110 -rotate-2"
        style={{ filter: "saturate(0.85) contrast(1.05) hue-rotate(-5deg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
      <div className="relative z-10 flex min-h-screen flex-col justify-between p-6 sm:p-10">
        <div className="flex items-start justify-between">
          <h1
            className="text-outline font-scrawl text-7xl sm:text-9xl leading-none -rotate-6"
            style={{ letterSpacing: "-0.05em" }}
          >
            ZAP
          </h1>
          <a
            href="https://zapoutdoorz.com"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs sm:text-sm text-neon hover:underline"
          >
            [zapoutdoorz.com]
          </a>
        </div>

        <div className="text-center -mt-20 sm:-mt-32">
          <p className="font-mono text-xs sm:text-sm text-neon tracking-widest animate-pulse">
            [ENTER YEAR 4]
          </p>
          <p className="mt-2 font-scrawl text-neon text-2xl sm:text-3xl -rotate-3">outdoorz</p>
        </div>

        <div className="space-y-2">
          <h2
            className="font-display text-cream text-6xl sm:text-8xl lg:text-9xl leading-[0.85] -rotate-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            September
          </h2>
          <div className="flex items-end justify-between gap-4">
            <p className="font-mono text-cream text-sm sm:text-base">[ 4 — 6 ]</p>
            <span
              className="text-outline-thick font-display text-6xl sm:text-8xl lg:text-9xl leading-none"
              style={{ letterSpacing: "0.02em" }}
            >
              2026
            </span>
          </div>
          <div className="pt-6">
            <a
              href="#lineup"
              className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-bark bg-neon px-4 py-2 rounded-sm hover:opacity-90 transition"
            >
              [ MEET THE LINEUP ↓ ]
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="relative px-4 sm:px-8 lg:px-16 py-20 sm:py-28 text-center">
      <p className="font-mono text-neon text-xs tracking-widest mb-4">[ THE LINEUP ]</p>
      <h2 className="font-display text-cream text-5xl sm:text-7xl leading-tight max-w-3xl mx-auto -rotate-1">
        Year four. <span className="text-outline">Meet</span> the artists.
        <br />
        Press play.
      </h2>
      <p className="mt-6 max-w-xl mx-auto text-muted-foreground text-sm sm:text-base">
        Forty acts across three days in the woods. Drop in, follow the sound, find your set before
        you get there.
      </p>
    </section>
  );
}

function FilterBar({
  filter,
  setFilter,
  query,
  setQuery,
  count,
}: {
  filter: Filter;
  setFilter: (f: Filter) => void;
  query: string;
  setQuery: (q: string) => void;
  count: number;
}) {
  return (
    <div className="sticky top-0 z-20 -mx-4 sm:-mx-8 lg:-mx-16 px-4 sm:px-8 lg:px-16 py-4 mb-8 bg-background/85 backdrop-blur border-b border-border/40">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-mono text-xs px-3 py-1.5 rounded-sm transition border ${
                  active
                    ? "bg-neon text-bark border-neon"
                    : "text-neon border-border hover:border-neon"
                }`}
              >
                [{f.toUpperCase()}]
              </button>
            );
          })}
        </div>
        <div className="flex-1 min-w-[180px]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search artist…"
            className="w-full bg-transparent border border-border focus:border-neon outline-none px-3 py-1.5 font-mono text-xs text-cream placeholder:text-muted-foreground rounded-sm"
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {count} / {ARTISTS.length}
        </span>
      </div>
    </div>
  );
}

function ArtistGrid({ artists, onSelect }: { artists: Artist[]; onSelect: (a: Artist) => void }) {
  if (artists.length === 0) {
    return (
      <p className="text-center font-mono text-muted-foreground py-20">[ no artists match ]</p>
    );
  }
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {artists.map((a, i) => (
        <li key={a.name}>
          <ArtistCard artist={a} index={i} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}

function ArtistCard({
  artist,
  index,
  onSelect,
}: {
  artist: Artist;
  index: number;
  onSelect: (a: Artist) => void;
}) {
  const acts = artist.members ?? [artist];
  const hasSoundcloud = acts.some((a) => a.soundcloud);
  const hasBandcamp = acts.some((a) => a.bandcamp);
  const hasMedia = hasSoundcloud || hasBandcamp;
  const rotate = ((index % 5) - 2) * 0.35;
  return (
    <button
      onClick={() => onSelect(artist)}
      className="group relative w-full text-left bg-card backdrop-blur border border-border hover:border-neon rounded-sm p-5 transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_var(--neon)]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="flex items-start justify-between gap-3 mb-6">
        <span className="font-mono text-[10px] tracking-widest text-neon">
          [{artist.category.toUpperCase()}]
        </span>
        <span
          className={`font-mono text-[10px] tracking-widest ${
            hasMedia ? "text-neon" : "text-muted-foreground"
          }`}
        >
          {hasMedia ? "▶ PLAY" : "TBA"}
        </span>
      </div>
      <h3 className="font-display text-cream text-3xl sm:text-4xl leading-none group-hover:text-neon transition-colors">
        {artist.name}
      </h3>
      <div className="mt-4 flex gap-2 font-mono text-[10px] text-muted-foreground">
        {hasSoundcloud && <span>SOUNDCLOUD</span>}
        {hasSoundcloud && hasBandcamp && <span>·</span>}
        {hasBandcamp && <span>BANDCAMP</span>}
      </div>
    </button>
  );
}

function ArtistModal({ artist, onClose }: { artist: Artist; onClose: () => void }) {
  const acts = artist.members ?? [artist];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${artist.name} — ${artist.category}`}
        className="relative w-full max-w-2xl bg-card border border-neon rounded-sm p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 font-mono text-xs text-neon hover:bg-neon hover:text-bark px-2 py-1 rounded-sm"
        >
          [ ESC × ]
        </button>
        <p className="font-mono text-[10px] tracking-widest text-neon mb-2">
          [{artist.category.toUpperCase()}]
        </p>
        <h2 className="font-display text-cream text-5xl sm:text-7xl leading-none mb-6 -rotate-1">
          {artist.name}
        </h2>

        {acts.map((act, i) => (
          <div key={act.name} className="mb-6 last:mb-0">
            {artist.members && (
              <p className="font-mono text-xs tracking-widest text-cream mb-2">{act.name}</p>
            )}
            <ActMedia act={act} autoPlay={i === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ActMedia({ act, autoPlay }: { act: Act; autoPlay: boolean }) {
  const scEmbed = act.soundcloud
    ? `https://w.soundcloud.com/player/?url=${encodeURIComponent(
        act.soundcloud,
      )}&color=%23d6ff3a&auto_play=${autoPlay}&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`
    : null;
  const bcEmbed = act.bandcamp ? `${act.bandcamp.replace(/\/$/, "")}` : null;

  return (
    <>
      {scEmbed ? (
        <div className="rounded-sm overflow-hidden border border-border mb-4">
          <iframe
            title={`${act.name} on SoundCloud`}
            width="100%"
            height="360"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={scEmbed}
          />
        </div>
      ) : bcEmbed ? (
        <div className="rounded-sm border border-border p-6 text-center mb-4">
          <p className="font-mono text-xs text-muted-foreground mb-3">[ listen on bandcamp ]</p>
          <a
            href={bcEmbed}
            target="_blank"
            rel="noreferrer"
            className="inline-block font-mono text-sm bg-neon text-bark px-4 py-2 rounded-sm"
          >
            OPEN {act.name} →
          </a>
        </div>
      ) : (
        <div className="rounded-sm border border-dashed border-border p-8 text-center mb-4">
          <p className="font-mono text-xs text-muted-foreground">
            [ no stream available yet — catch them at the campout ]
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 font-mono text-xs">
        {act.soundcloud && (
          <a
            href={act.soundcloud}
            target="_blank"
            rel="noreferrer"
            className="text-neon border border-border hover:border-neon px-3 py-1.5 rounded-sm"
          >
            SOUNDCLOUD ↗
          </a>
        )}
        {act.bandcamp && (
          <a
            href={act.bandcamp}
            target="_blank"
            rel="noreferrer"
            className="text-neon border border-border hover:border-neon px-3 py-1.5 rounded-sm"
          >
            BANDCAMP ↗
          </a>
        )}
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border/40 px-4 sm:px-8 lg:px-16 py-12 text-center">
      <p className="font-scrawl text-neon text-3xl sm:text-4xl -rotate-2">see you in the woods</p>
      <p className="font-mono text-xs text-muted-foreground mt-4">
        [ ZAP CAMPOUT · SEPTEMBER 4–6 · 2026 ]
      </p>
      <a
        href="https://zapoutdoorz.com"
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-3 font-mono text-xs text-neon hover:underline"
      >
        zapoutdoorz.com ↗
      </a>
    </footer>
  );
}
