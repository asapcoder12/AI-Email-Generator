import Image from "next/image";

const logos = [
  {
    name: "Spotify",
    src: "/images/logos-clean/spotify.png",
    width: 1506,
    height: 465,
  },
  {
    name: "Coinbase",
    src: "/images/logos-clean/coinbase.png",
    width: 2292,
    height: 441,
  },
  {
    name: "Slack",
    src: "/images/logos-clean/slack.png",
    width: 1302,
    height: 348,
  },
  {
    name: "Dropbox",
    src: "/images/logos-clean/dropbox.png",
    width: 1670,
    height: 364,
  },
  {
    name: "Webflow",
    src: "/images/logos-clean/webflow.png",
    width: 1500,
    height: 432,
  },
  {
    name: "Zoom",
    src: "/images/logos-clean/zoom.png",
    width: 1694,
    height: 412,
  },
];

export function TrustLogos() {
  return (
    <section
      aria-label="Trusted by teams"
      className="border-b border-border bg-background px-5 py-9 sm:px-8 lg:px-10"
    >
      <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-9 gap-y-6 sm:gap-x-12 lg:gap-x-14">
        {logos.map((logo) => (
          <li className="flex h-10 items-center justify-center" key={logo.name}>
            <Image
              alt={logo.name}
              className="h-6 w-auto object-contain sm:h-7"
              height={logo.height}
              sizes="(min-width: 1024px) 140px, 112px"
              src={logo.src}
              width={logo.width}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
