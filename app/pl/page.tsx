'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export default function ADCCWorldChampionship2026Site() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Strona główna', href: '#home' },
    { label: 'Główne wydarzenie', href: '#worlds' },
    { label: 'Zawodnicy', href: '/pl/competitors' },
    { label: 'Turniej amatorski', href: '#amateur' },
    { label: 'Miasto gospodarza', href: '#city' },
    { label: 'Hala', href: '#venue' },
    { label: 'Dojazd', href: '#airport' },
    { label: 'Noclegi', href: '#hotels' },
    { label: 'Bilety', href: '#tickets' },
    { label: 'Sponsorzy', href: '#sponsors' },
  ];

  const sponsorCards = [
    {
      name: 'Royal Group',
      logo: '/sponsor-1.png',
      website: 'https://adcombat.com',
      instagram: 'https://www.instagram.com/adccworld/',
    },
    {
      name: 'FloGrappling',
      logo: '/sponsor-2.png',
      website: 'https://www.flograppling.com/',
      instagram: 'https://www.instagram.com/flograppling/',
    },
    {
      name: 'Pitbull',
      logo: '/sponsor-3.png',
      website: 'https://pitbull.store',
      instagram: 'https://www.instagram.com/pitbullsports/',
    },
    {
      name: '971 MMA',
      logo: '/sponsor-4.png',
      website: 'https://971mma.com',
      instagram: 'https://www.instagram.com/971mma/',
    },
    {
      name: 'Sponsor 5',
      logo: '/sponsor-5.png',
      website: 'https://example.com/sponsor-5',
      instagram: 'https://www.instagram.com/sponsor5/',
    },
    {
      name: 'Sponsor 6',
      logo: '/sponsor-6.png',
      website: 'https://example.com/sponsor-6',
      instagram: 'https://www.instagram.com/sponsor6/',
    },
  ];

  const eventDate = useMemo(() => new Date('2026-09-12T10:00:00'), []);

  const getTimeLeft = () => {
    const now = new Date();
    const diff = Math.max(eventDate.getTime() - now.getTime(), 0);

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeLeft(getTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  const countdownItems = [
    { value: String(timeLeft.days).padStart(2, '0'), label: 'Dni' },
    { value: String(timeLeft.hours).padStart(2, '0'), label: 'Godziny' },
    { value: String(timeLeft.minutes).padStart(2, '0'), label: 'Minuty' },
    { value: String(timeLeft.seconds).padStart(2, '0'), label: 'Sekundy' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_20%),linear-gradient(180deg,#000000_0%,#050505_50%,#000000_100%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:flex-row lg:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition hover:border-amber-400 hover:text-amber-400 lg:hidden"
            >
              <span className="relative block h-5 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'top-2 rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 top-4 h-0.5 w-5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'top-2 -rotate-45' : ''
                  }`}
                />
              </span>
            </button>

            <img src="/adcc-logo.png" alt="ADCC logo" className="h-12 w-auto object-contain" />
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <nav className="flex flex-wrap justify-center gap-4 text-center text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/75 transition duration-300 hover:text-amber-400"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/"
              className="rounded-xl border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:border-amber-400 hover:text-amber-400"
            >
              EN
            </Link>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-black/95 lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.15em] text-white/80 transition hover:bg-white/5 hover:text-amber-400"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 rounded-xl border border-amber-400/40 px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.2em] text-amber-400"
              >
                English
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,158,11,0.14),transparent_35%,transparent_65%,rgba(245,158,11,0.08))]" />

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
            <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
              <img
                src="/adcc-2026-logo.png"
                alt="ADCC 2026"
                className="mx-auto mb-8 w-full max-w-xs sm:max-w-sm lg:mx-0 lg:max-w-md"
              />

              <h1 className="mt-6 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
                Najbardziej prestiżowe wydarzenie grapplingowe na świecie powraca w 2026 roku
              </h1>

              <p
                className="mt-6 max-w-2xl text-justify text-base leading-7 text-white/75 sm:text-lg sm:leading-8 lg:text-xl"
                style={{ textAlignLast: 'center' }}
              >
                ADCC World Championship 2026 zgromadzi największe gwiazdy tego sportu, przyciągnie
                uwagę międzynarodowej publiczności i stworzy atmosferę mistrzostw przygotowaną
                z myślą o tysiącach kibiców na żywo.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                <a
                  href="#tickets"
                  className="rounded-2xl bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-black transition duration-300 hover:scale-[1.03]"
                >
                  Kup bilety
                </a>

                <Link
                  href="/pl/competitors"
                  className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition duration-300 hover:border-amber-400 hover:text-amber-400"
                >
                  Zobacz zawodników
                </Link>
              </div>

              <div className="mt-10 w-full max-w-3xl rounded-[2rem] border border-amber-400/25 bg-gradient-to-r from-amber-400/10 to-white/[0.03] p-6 backdrop-blur-xl">
                <div className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
                  Do rozpoczęcia ADCC World Championship 2026
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {countdownItems.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/20 bg-zinc-900/95 p-4 text-center shadow-lg shadow-black/40"
                    >
                      <div className="text-3xl font-black uppercase text-white">{item.value}</div>
                      <div className="mt-2 text-xs uppercase tracking-[0.25em] text-white/45">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 flex justify-center">
              <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-black/70 shadow-2xl shadow-black/40 backdrop-blur-xl lg:max-w-none">
                <div className="flex w-full justify-center bg-black">
                  <video
                    className="h-auto max-h-[70vh] w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  >
                    <source src="/hero-video.mp4" type="video/mp4" />
                    Twoja przeglądarka nie obsługuje odtwarzania wideo.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="worlds" className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
                Główne wydarzenie
              </div>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                ADCC World Championship 2026
              </h2>
              <p
                className="mt-6 text-justify text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
                style={{ textAlignLast: 'center' }}
              >
                To najwyższy poziom rywalizacji w submission grapplingu. Najlepsi zawodnicy świata,
                jedna mistrzowska scena i weekend zaprojektowany tak, aby był większy, głośniejszy
                i bardziej legendarny niż kiedykolwiek wcześniej.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {[
                [
                  'Elitarna obsada',
                  'Mistrzowie, zaproszone gwiazdy i zawodnicy najwyższego poziomu gotowi walczyć o najbardziej prestiżowy tytuł w tym sporcie.',
                ],
                [
                  'Spektakularna produkcja',
                  'Światowej klasy oprawa przygotowana dla publiczności na żywo, z najwyższej jakości realizacją wizualną i niezapomnianymi momentami transmisji.',
                ],
                [
                  'Światowa uwaga',
                  'Kibice, media, marki i zawodnicy z całego świata skupieni na jednej mistrzowskiej scenie.',
                ],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-white/20 bg-zinc-900/95 p-7 text-center shadow-lg shadow-black/40 backdrop-blur-sm"
                >
                  <h3 className="text-2xl font-black uppercase">{title}</h3>
                  <p
                    className="mt-4 text-justify text-sm leading-7 text-white/70"
                    style={{ textAlignLast: 'center' }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="amateur" className="border-b border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="text-center">
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                  ADCC Amateur World Championship
                </h2>
                <p
                  className="mt-6 text-justify text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
                  style={{ textAlignLast: 'center' }}
                >
                  Mistrzostwa amatorów to otwarty turniej dla zawodników z całego świata,
                  który daje każdemu możliwość wejścia na największą scenę grapplingu.
                  Uczestnicy otrzymają wyjątkową szansę rywalizacji w tej samej hali, w której odbędą się
                  Mistrzostwa Świata ADCC, stając się częścią globalnego wydarzenia ADCC i walcząc
                  w miejscu, gdzie występuje elita tego sportu.
                </p>
                <p
                  className="mt-4 text-justify text-base leading-7 text-white/65 sm:leading-8"
                  style={{ textAlignLast: 'center' }}
                >
                  Prawdziwie globalne spotkanie, które łączy zawodników, kluby i kibiców,
                  tworząc wyjątkową atmosferę wokół najważniejszego wydarzenia grapplingowego na świecie.
                </p>

                <div className="mt-8 flex justify-center">
                  <a
                    href="https://smoothcomp.com/en/event/29650"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl bg-amber-400 px-8 py-4 text-sm font-bold uppercase tracking-[0.25em] text-black transition duration-300 hover:scale-[1.05]"
                  >
                    Zarejestruj się
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/20 bg-zinc-900/95 p-8 text-center shadow-lg shadow-black/40 backdrop-blur-xl">
                <h3 className="text-2xl font-black uppercase">Dlaczego warto wystartować</h3>
                <div className="mt-6 space-y-4 text-left text-sm leading-7 text-white/70">
                  <div>• Przeżyj pełny tydzień mistrzowski ADCC.</div>
                  <div>• Zmierz się z czołowymi zawodnikami z całego świata.</div>
                  <div>• Rywalizuj w tej samej hali co zawodnicy Mistrzostw Świata ADCC.</div>
                  <div>• Zacznij budować swoją markę na największej scenie grapplingu.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="city" className="border-b border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
                Miasto gospodarz
              </div>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                Kraków jest gotowy na świat
              </h2>
              <p
                className="mt-6 text-justify text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
                style={{ textAlignLast: 'center' }}
              >
                Kraków jest jednym z najbardziej rozpoznawalnych miast w Polsce oraz jednym z najważniejszych
                ośrodków międzynarodowych wydarzeń, turystyki i prestiżowych widowisk na żywo.
                Obszar metropolitalny Krakowa zamieszkuje ponad milion osób, co zapewnia silne lokalne
                zaplecze publiczności i skalę dużego miasta. Dzięki dużej populacji, globalnej rozpoznawalności
                oraz rozwiniętej bazie hotelowej Kraków jest idealnym miejscem dla ADCC World Championship 2026.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {[
                [
                  'Międzynarodowy kierunek',
                  'Miasto znane w całej Europie z kultury, turystyki, historii i największych międzynarodowych wydarzeń.',
                ],
                [
                  'Energia wielkiego miasta',
                  'Kraków to idealne miejsce na niezapomniany weekend, łączący światowej klasy rywalizację z tętniącym życiem miastem pełnym kultury, doskonałej kuchni i wyjątkowej atmosfery.',
                ],
                [
                  'Idealna sceneria wydarzenia',
                  'Historyczny charakter połączony z nowoczesną infrastrukturą tworzy wyjątkowe doświadczenie dla zawodników i kibiców.',
                ],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-white/20 bg-zinc-900/95 p-7 text-center shadow-lg shadow-black/40 backdrop-blur-xl"
                >
                  <h3 className="text-2xl font-black uppercase">{title}</h3>
                  <p
                    className="mt-4 text-justify text-sm leading-7 text-white/70"
                    style={{ textAlignLast: 'center' }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="venue" className="border-b border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
              <div className="text-center">
                <div className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
                  Hala
                </div>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                  TAURON Arena Kraków
                </h2>
                <p
                  className="mt-6 text-justify text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
                  style={{ textAlignLast: 'center' }}
                >
                  Jedna z najbardziej imponujących hal widowiskowych w Polsce i idealne miejsce dla nowoczesnego
                  widowiska sportów walki. TAURON Arena zapewnia ADCC odpowiednią skalę, atmosferę
                  i oprawę wizualną niezbędną dla prawdziwych mistrzostw świata.
                </p>
              </div>

              <div className="flex justify-center">
                <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/70 shadow-2xl shadow-black/40 backdrop-blur-xl">
                  <div className="flex w-full justify-center bg-black">
                    <video
                      className="aspect-[16/9] w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                    >
                      <source src="/arena-video.mp4" type="video/mp4" />
                      Twoja przeglądarka nie obsługuje odtwarzania wideo.
                    </video>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {[
                ['Ogromna pojemność', 'Obiekt stworzony z myślą o największych widowiskach na żywo i międzynarodowych wydarzeniach sportowych.'],
                [
                  'Najwyższa jakość wizualna',
                  'Hala umożliwiająca realizację oświetlenia, scenografii i produkcji na najwyższym poziomie.',
                ],
                [
                  'Mistrzowska atmosfera',
                  'Arena, na której każde wejście, każda walka i każdy finał nabierają jeszcze większego znaczenia.',
                ],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-white/20 bg-zinc-900/95 p-7 text-center shadow-lg shadow-black/40 backdrop-blur-sm"
                >
                  <h3 className="text-2xl font-black uppercase">{title}</h3>
                  <p
                    className="mt-4 text-justify text-sm leading-7 text-white/70"
                    style={{ textAlignLast: 'center' }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="airport" className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="text-center">
                <div className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
                  Dojazd
                </div>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                  Lotnisko w Krakowie łączy wydarzenie ze światem
                </h2>
                <p
                  className="mt-6 text-justify text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
                  style={{ textAlignLast: 'center' }}
                >
                  Dogodne połączenia międzynarodowe są jedną z największych zalet Krakowa. Lotnisko
                  ułatwia podróż zawodnikom, trenerom, mediom, sponsorom i kibicom przybywającym
                  z całej Europy i innych części świata, obsługując rocznie ponad 13 milionów pasażerów.
                </p>
                <p
                  className="mt-4 text-justify text-base leading-7 text-white/65 sm:leading-8"
                  style={{ textAlignLast: 'center' }}
                >
                  Krótki czas przejazdu między lotniskiem a centrum miasta, wynoszący około 25 minut,
                  sprawia, że cały wyjazd na mistrzostwa jest wygodny, sprawny i komfortowy.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [
                    'Międzynarodowy zasięg',
                    'Bezpośrednie połączenia z ponad 170 lotniskami na świecie sprawiają, że podróż do Krakowa jest łatwa i dostępna dla gości z całego świata.',
                  ],
                  ['Szybki dojazd do miasta', 'Wygodny dojazd z lotniska do hotelu, hali i centrum miasta.'],
                  ['Wygodne podróżowanie', 'Idealne rozwiązanie dla kibiców, drużyn i międzynarodowych partnerów wydarzenia.'],
                  ['Przewaga wydarzenia', 'Sprawna logistyka zwiększa atrakcyjność udziału w wydarzeniu na żywo.'],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-[2rem] border border-white/20 bg-zinc-900/95 p-6 text-center shadow-lg shadow-black/40 backdrop-blur-sm"
                  >
                    <div className="text-lg font-black uppercase">{title}</div>
                    <p
                      className="mt-3 text-justify text-sm leading-7 text-white/65"
                      style={{ textAlignLast: 'center' }}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="hotels" className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="text-center">
                <div className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
                  Noclegi
                </div>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                  Rozbudowana baza hotelowa dla zawodników i kibiców
                </h2>
                <p
                  className="mt-6 text-justify text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
                  style={{ textAlignLast: 'center' }}
                >
                  Kraków oferuje szeroki wybór noclegów dla każdego rodzaju gości, od hoteli premium
                  po praktyczne rozwiązania dla drużyn, rodzin i międzynarodowych kibiców.
                </p>
                <p
                  className="mt-4 text-justify text-base leading-7 text-white/65 sm:leading-8"
                  style={{ textAlignLast: 'center' }}
                >
                  Dzięki temu miasto jest idealnie przygotowane na kilkudniowe mistrzostwa z udziałem tysięcy przyjezdnych gości.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Hotele premium', 'Komfortowe opcje dla gości VIP, partnerów i gości biznesowych.'],
                  ['Opcje średniej klasy', 'Szeroki wybór dla drużyn, kibiców i osób planujących dłuższy pobyt.'],
                  ['Noclegi w centrum', 'Łatwy dostęp do restauracji, atrakcji turystycznych i atmosfery tygodnia mistrzowskiego.'],
                  ['Przyjazne dla grup', 'Elastyczne opcje noclegowe dla klubów, ekip i rodzin.'],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-[2rem] border border-white/20 bg-zinc-900/95 p-6 text-center shadow-lg shadow-black/40 backdrop-blur-xl"
                  >
                    <div className="text-lg font-black uppercase">{title}</div>
                    <p
                      className="mt-3 text-justify text-sm leading-7 text-white/65"
                      style={{ textAlignLast: 'center' }}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="tickets" className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
                Bilety
              </div>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                Bądź tam, gdy tworzy się historia
              </h2>
              <p
                className="mt-6 text-justify text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
                style={{ textAlignLast: 'center' }}
              >
                Zarezerwuj swoje miejsce na jeden z największych weekendów w świecie grapplingu. Doskonałe miejsca,
                rywalizacja na światowym poziomie i widowisko na żywo stworzone dla prawdziwych fanów tego sportu.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-amber-400/35 bg-zinc-900/95 p-8 text-center shadow-2xl shadow-black/40">
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
                Oficjalne informacje o biletach
              </div>
              <h3 className="mt-3 text-2xl font-black uppercase sm:text-3xl">
                Bilety dostępne u oficjalnego partnera sprzedaży
              </h3>
              <div className="mt-6 flex justify-center">
                <a
                  href="https://www.ebilet.pl/en/sport/sporty-walki/adcc-world-championship"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition duration-300 hover:border-amber-400 hover:text-amber-400"
                >
                  Bilety
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="sponsors" className="border-b border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
                Sponsorzy
              </div>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                PARTNERZY I SPONSORZY
              </h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sponsorCards.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="rounded-[2rem] border border-white/20 bg-zinc-900/95 p-8 text-center shadow-lg shadow-black/40 backdrop-blur-xl"
                >
                  <div className="mb-4 text-lg font-black uppercase tracking-[0.12em] text-white">
                    {sponsor.name}
                  </div>

                  <div className="flex min-h-[170px] items-center justify-center rounded-[1.5rem] border border-white/15 bg-black/50 px-6">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-20 w-auto max-w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                        if (next) next.style.display = 'block';
                      }}
                    />
                    <span className="hidden text-sm uppercase tracking-[0.25em] text-white/35">
                      logo sponsora
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-4">
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${sponsor.name} strona internetowa`}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition hover:border-amber-400 hover:text-amber-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21a9 9 0 100-18 9 9 0 000 18z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18"
                        />
                      </svg>
                    </a>

                    <a
                      href={sponsor.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${sponsor.name} Instagram`}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition hover:border-amber-400 hover:text-amber-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.54 4 20 5.46 20 7.75v8.5c0 2.29-1.46 3.75-3.75 3.75h-8.5C5.46 20 4 18.54 4 16.25v-8.5C4 5.46 5.46 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="text-center">
                <div className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
                  Kontakt
                </div>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                  Stwórzmy razem coś wielkiego
                </h2>
                <p
                  className="mx-auto mt-6 max-w-2xl text-justify text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
                  style={{ textAlignLast: 'center' }}
                >
                  W sprawach partnerstw, współpracy medialnej i komunikacji dotyczącej wydarzenia
                  prosimy o kontakt przy użyciu poniższych danych.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/20 bg-zinc-900/95 p-8 text-center shadow-lg shadow-black/40 backdrop-blur-xl">
                <div className="space-y-5 text-sm leading-7 text-white/75">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/45">E-mail</div>
                    <div className="mt-1 text-lg font-semibold text-white">info@no-gi.pl</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/80">
        <div className="flex justify-center gap-6 pt-6">
          <a
            href="https://www.instagram.com/adccworld/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-white/70 transition hover:text-amber-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.54 4 20 5.46 20 7.75v8.5c0 2.29-1.46 3.75-3.75 3.75h-8.5C5.46 20 4 18.54 4 16.25v-8.5C4 5.46 5.46 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
            </svg>
            Instagram
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=100064479980938"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-white/70 transition hover:text-amber-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 22v-8h3l1-4h-4V7.5c0-1.2.3-2 2-2h2V2.2C16.7 2.1 15.6 2 14.3 2 11.6 2 10 3.6 10 6.6V10H7v4h3v8h3z" />
            </svg>
            Facebook
          </a>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-center text-sm text-white/50 md:flex-row">
          <div className="uppercase tracking-[0.2em]">© 2026 ADCC World Championship</div>
          <div className="flex flex-wrap justify-center gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-amber-400">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}