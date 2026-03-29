import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

type Athlete = {
  name: string;
  country: string;
  instagram: string;
};

const divisions = {
  men: [
    { category: '-66 kg', slug: 'men-66', spots: 16 },
    { category: '-77 kg', slug: 'men-77', spots: 16 },
    { category: '-88 kg', slug: 'men-88', spots: 16 },
    { category: '-99 kg', slug: 'men-99', spots: 16 },
    { category: '+99 kg', slug: 'men-plus-99', spots: 16 },
  ],
  women: [
    { category: '-55 kg', slug: 'women-55', spots: 8 },
    { category: '-65 kg', slug: 'women-65', spots: 8 },
    { category: '+65 kg', slug: 'women-plus-65', spots: 8 },
  ],
};

function parseCSV(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim());
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? '';
    });

    return row;
  });
}

function fillSpots(athletes: Athlete[], spots: number) {
  const arr = [...athletes];
  while (arr.length < spots) {
    arr.push({
      name: 'TBD',
      country: '',
      instagram: '',
    });
  }
  return arr;
}

async function loadData() {
  const filePath = path.join(process.cwd(), 'app/data/competitors.csv');

  try {
    const file = await fs.readFile(filePath, 'utf8');
    const rows = parseCSV(file);

    const build = (group: 'men' | 'women') =>
      divisions[group].map((div) => ({
        ...div,
        athletes: rows
          .filter((r) => r.gender === group)
          .filter((r) => r.category === div.category)
          .filter((r) => r.name)
          .map((r) => ({
            name: r.name,
            country: r.country || '',
            instagram: r.instagram || '',
          })),
      }));

    return {
      men: build('men'),
      women: build('women'),
    };
  } catch {
    return {
      men: divisions.men.map((d) => ({ ...d, athletes: [] })),
      women: divisions.women.map((d) => ({ ...d, athletes: [] })),
    };
  }
}

function InstagramIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.54 4 20 5.46 20 7.75v8.5c0 2.29-1.46 3.75-3.75 3.75h-8.5C5.46 20 4 18.54 4 16.25v-8.5C4 5.46 5.46 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
    </svg>
  );
}

export default async function CompetitorsPage() {
  const data = await loadData();

  const menCount = data.men.reduce((s, d) => s + d.athletes.length, 0);
  const womenCount = data.women.reduce((s, d) => s + d.athletes.length, 0);

  const menSpots = divisions.men.reduce((s, d) => s + d.spots, 0);
  const womenSpots = divisions.women.reduce((s, d) => s + d.spots, 0);
  const totalSpots = menSpots + womenSpots;

  const quickMenu = [
    { label: 'M -66', href: '#men-66' },
    { label: 'M -77', href: '#men-77' },
    { label: 'M -88', href: '#men-88' },
    { label: 'M -99', href: '#men-99' },
    { label: 'M +99', href: '#men-plus-99' },
    { label: 'W -55', href: '#women-55' },
    { label: 'W -65', href: '#women-65' },
    { label: 'W +65', href: '#women-plus-65' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <img
            src="/adcc-logo.png"
            alt="ADCC"
            className="h-12 w-auto object-contain"
          />

          <div className="hidden lg:flex gap-3">
            {quickMenu.map((i) => (
              <a
                key={i.href}
                href={i.href}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold uppercase tracking-[0.15em] text-white/80 transition hover:border-amber-400 hover:text-amber-400"
              >
                {i.label}
              </a>
            ))}
          </div>

          <Link
            href="/"
            className="rounded-xl border border-white/15 px-4 py-2 text-sm font-bold uppercase tracking-[0.15em] text-white/80 transition hover:border-amber-400 hover:text-amber-400"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <main className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-6 w-full">
              <img
                src="/adcc-2026-logo.png"
                alt="ADCC 2026"
                className="mx-auto h-auto w-full max-w-4xl object-contain"
              />
            </div>

            <h1 className="w-full text-4xl font-black uppercase leading-tight md:text-5xl">
              Competitor's Lineup
            </h1>

            <div className="mt-10 grid w-full grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/10 p-4 text-center">
                <div className="text-3xl font-black">
                  {menCount} / {menSpots}
                </div>
                <div className="whitespace-nowrap text-xs uppercase tracking-[0.08em] text-white/50">
                  Men Announced
                </div>
              </div>

              <div className="rounded-xl border border-white/10 p-4 text-center">
                <div className="text-3xl font-black">
                  {womenCount} / {womenSpots}
                </div>
                <div className="whitespace-nowrap text-xs uppercase tracking-[0.08em] text-white/50">
                  Women Announced
                </div>
              </div>

              <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-4 text-center">
                <div className="text-3xl font-black text-amber-400">
                  {menCount + womenCount} / {totalSpots}
                </div>
                <div className="whitespace-nowrap text-xs uppercase tracking-[0.08em] text-white/50">
                  Total Announced
                </div>
              </div>
            </div>
          </div>

          {(['men', 'women'] as const).map((group) => (
            <div key={group} className="mt-20">
              <h2 className="mb-10 text-center text-2xl font-bold uppercase">
                {group}
              </h2>

              {data[group].map((div) => {
                const rows = fillSpots(div.athletes, div.spots);

                return (
                  <section key={div.slug} id={div.slug} className="mb-16 scroll-mt-32">
                    <div className="mb-6 flex items-center justify-center gap-6">
                      <h3 className="text-2xl font-black text-amber-400">
                        {div.category}
                      </h3>

                      <div className="text-sm text-white/40">
                        {div.athletes.length}/{div.spots}
                      </div>
                    </div>

                    <div className="mx-auto grid max-w-4xl gap-3">
                      {rows.map((a, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition hover:border-amber-400/40"
                        >
                          <div className="flex items-center gap-6">
                            <div className="w-10 text-xl font-bold text-white/30">
                              {i + 1}
                            </div>

                            <div className="flex items-center gap-3 text-lg font-semibold md:text-xl">
                              <span>{a.name}</span>
                              {a.country && (
                                <span className="font-medium text-white/40">
                                  ({a.country})
                                </span>
                              )}
                            </div>
                          </div>

                          {a.instagram ? (
                            <a
                              href={a.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white/50 transition hover:text-amber-400"
                            >
                              <InstagramIcon />
                            </a>
                          ) : (
                            <span className="text-white/20">
                              <InstagramIcon />
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}