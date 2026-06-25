const logos = [
  { name: "Spotify", className: "text-[#1db954]" },
  { name: "coinbase", className: "text-[#0a67ff]" },
  { name: "slack", className: "text-[#292827]" },
  { name: "Dropbox", className: "text-[#1265fe]" },
  { name: "webflow", className: "text-[#292827]" },
  { name: "zoom", className: "text-[#2d8cff]" },
];

export function TrustLogos() {
  return (
    <section
      aria-label="Trusted by teams"
      className="border-b border-border bg-background px-5 py-9 sm:px-8 lg:px-10"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-5 sm:gap-x-16">
        {logos.map((logo) => (
          <span
            className={`text-lg font-semibold leading-none ${logo.className}`}
            key={logo.name}
          >
            {logo.name}
          </span>
        ))}
      </div>
    </section>
  );
}
