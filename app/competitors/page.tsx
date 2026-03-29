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
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.54 4 20 5.46 20 7.75v8.5c0 2.29-1.46 3.75-3.75 3.75h-8.5C5.46 20 4 18.54 4 16.25v-8.5C4 5.46 5.46 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
    </svg>
  );
}

export default async function CompetitorsPage() {
  const data = await loadData();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <img src="/adcc-logo.png" className="h-12" />

          <Link
            href="/"
            className="rounded-xl border border-white/15 px-4 py-2 text-sm font-bold uppercase tracking-[0.15em] text-white/80 hover:border-amber-400 hover:text-amber-400"
          >
            Back
          </Link>
        </div>
      </header>

      <main className="px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <img src="/adcc-2026-logo.png" className="mx-auto mb-6 max-w-3xl" />

          <h1 className="text-4xl font-black uppercase md:text-5xl">
            Competitor's Lineup
          </h1>

          {/* 🔥 STATY */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/10 p-4">
              <div className="text-3xl font-black">80</div>
              <div className="text-xs uppercase text-white/50">Men</div>
            </div>

            <div className="rounded-xl border border-white/10 p-4">
              <div className="text-3xl font-black">24</div>
              <div className="text-xs uppercase text-white/50">Women</div>
            </div>

            <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-4">
              <div className="text-3xl font-black text-amber-400">104</div>
              <div className="text-xs uppercase text-white/50">Total</div>
            </div>
          </div>

          {(['men', 'women'] as const).map((group) => (
            <div key={group} className="mt-20">
              <h2 className="mb-10 text-2xl font-bold uppercase">{group}</h2>

              {data[group].map((div) => {
                const rows = fillSpots(div.athletes, div.spots);

                return (
                  <section key={div.slug} className="mb-16">
                    <h3 className="mb-6 text-xl font-black text-amber-400">
                      {div.category}
                    </h3>

                    <div className="mx-auto grid max-w-4xl gap-3">
                      {rows.map((a, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-xl border border-white/10 px-5 py-4"
                        >
                          <div className="text-left text-lg font-semibold">
                            {a.name}
                            {a.country && (
                              <span className="ml-2 text-white/40">
                                ({a.country})
                              </span>
                            )}
                          </div>

                          {a.instagram && (
                            <a href={a.instagram} target="_blank">
                              <InstagramIcon />
                            </a>
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