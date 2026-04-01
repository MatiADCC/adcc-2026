'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export default function ADCCWorldChampionship2026Site() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Main Event', href: '#worlds' },
    { label: 'Competitors', href: '/competitors' },
    { label: 'Next Generation', href: '#amateur' },
    { label: 'Host City', href: '#city' },
    { label: 'Venue', href: '#venue' },
    { label: 'Accessibility', href: '#airport' },
    { label: 'Accommodation', href: '#hotels' },
    { label: 'Tickets', href: '#tickets' },
  ];

  const sponsorTiers = [
    {
      name: 'Official Partner',
      points: ['Headline event exposure', 'Premium on-site branding', 'Dedicated digital visibility'],
    },
    {
      name: 'Event Sponsor',
      points: ['Logo across key assets', 'Audience engagement activations', 'Hospitality and networking options'],
    },
    {
      name: 'Supporting Sponsor',
      points: ['Brand placement in selected areas', 'Community reach within grappling', 'Flexible partnership format'],
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
    { value: String(timeLeft.days).padStart(2, '0'), label: 'Days' },
    { value: String(timeLeft.hours).padStart(2, '0'), label: 'Hours' },
    { value: String(timeLeft.minutes).padStart(2, '0'), label: 'Minutes' },
    { value: String(timeLeft.seconds).padStart(2, '0'), label: 'Seconds' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_20%),linear-gradient(180deg,#000000_0%,#050505_50%,#000000_100%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:flex-row lg:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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

          <nav className="hidden flex-wrap justify-center gap-4 text-center text-sm lg:flex">
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
                The world’s most prestigious grappling event returns in 2026
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 lg:text-xl">
                ADCC World Championship 2026 brings the sport’s biggest names, the strongest
                international attention, and a championship atmosphere built for a massive live
                audience.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                <a
                  href="#tickets"
                  className="rounded-2xl bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-black transition duration-300 hover:scale-[1.03]"
                >
                  Get Tickets
                </a>

                <Link
                  href="/competitors"
                  className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition duration-300 hover:border-amber-400 hover:text-amber-400"
                >
                  View Competitors
                </Link>
              </div>

              <div className="mt-10 w-full max-w-3xl rounded-[2rem] border border-amber-400/25 bg-gradient-to-r from-amber-400/10 to-white/[0.03] p-6 backdrop-blur-xl">
                <div className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
                  Countdown to ADCC World Championship 2026
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {countdownItems.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-black/50 p-4 text-center"
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
                    Your browser does not support the video tag.
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
                Main Event
              </div>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                ADCC World Championship 2026
              </h2>
              <p className="mt-6 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                This is the highest stage in submission grappling. The best athletes in the world,
                one championship platform, and a weekend designed to feel bigger, louder, and more
                legendary than ever.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {[
                [
                  'Elite Line-Up',
                  'Champions, invited stars, and top-level competitors ready to fight for the most respected title in the sport.',
                ],
                [
                  'Massive Production',
                  'A world-class event setup created for the live crowd, premium visuals, and unforgettable broadcast moments.',
                ],
                [
                  'Global Attention',
                  'Fans, media, brands, and athletes from around the world focused on one championship stage.',
                ],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/[0.03] p-7 text-center backdrop-blur-sm"
                >
                  <h3 className="text-2xl font-black uppercase">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="amateur" className="border-b border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="text-center">
                <div className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
             
                </div>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                  ADCC Amateur World Championship
                </h2>
                <p className="mt-6 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                  The amateur championship expands the experience far beyond one event. It brings
                  ambitious athletes from around the world into the ADCC ecosystem and creates an
                  even bigger festival of grappling in the host city.
                </p>
                <p className="mt-4 text-base leading-7 text-white/65 sm:leading-8">
                  More competitors, more teams, more families, more community, and more energy
                  around the biggest brand in submission grappling.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-black/60 p-8 text-center backdrop-blur-xl">
                <h3 className="text-2xl font-black uppercase">Why it matters</h3>
                <div className="mt-6 space-y-4 text-sm leading-7 text-white/70">
                  <div>• Builds a full championship-week atmosphere around ADCC.</div>
                  <div>• Expands international reach across athletes and teams.</div>
                  <div>• Strengthens the event footprint in Kraków.</div>
                  <div>• Creates long-term loyalty among future stars of the sport.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="city" className="border-b border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
                Host City
              </div>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                Kraków is ready for the world
              </h2>
              <p className="mt-6 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                Kraków is one of the most recognizable cities in Poland and one of the country’s
                strongest destinations for international events, tourism, and premium live
                experiences. The wider Kraków metropolitan area is home to over 1 million people,
                creating a strong local audience base and urban scale. With a large metropolitan
                population, global visibility, and a strong hospitality base, it is the perfect
                stage for ADCC World Championship 2026.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {[
                [
                  'Global Destination',
                  'A city known across Europe for culture, tourism, history, and major international events.',
                ],
                [
                  'Big-City Energy',
                  'A strong metropolitan area with the scale, atmosphere, and audience potential needed for a global championship weekend.',
                ],
                [
                  'Perfect Event Backdrop',
                  'Historic identity combined with modern infrastructure creates a unique host-city experience for athletes and fans.',
                ],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-white/10 bg-black/60 p-7 text-center backdrop-blur-xl"
                >
                  <h3 className="text-2xl font-black uppercase">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">{text}</p>
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
                  Venue
                </div>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                  TAURON Arena Kraków
                </h2>
                <p className="mt-6 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                  One of the most impressive indoor venues in Poland and a perfect fit for a modern
                  combat sports spectacle. TAURON Arena gives ADCC the scale, atmosphere, and
                  visual impact required for a true world championship presentation.
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
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {[
                ['Massive Capacity', 'Built for major live entertainment and international sports events.'],
                [
                  'Premium Visual Experience',
                  'A venue capable of delivering lighting, staging, and production at the highest level.',
                ],
                [
                  'Championship Atmosphere',
                  'The kind of arena that makes every entrance, every match, and every final feel bigger.',
                ],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/[0.03] p-7 text-center backdrop-blur-sm"
                >
                  <h3 className="text-2xl font-black uppercase">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">{text}</p>
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
                  Accessibility
                </div>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                  Kraków Airport connects the event to the world
                </h2>
                <p className="mt-6 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                  Fast international access is one of Kraków’s biggest advantages. The airport
                  makes travel easy for athletes, coaches, media, sponsors, and fans coming from
                  across Europe and beyond.
                </p>
                <p className="mt-4 text-base leading-7 text-white/65 sm:leading-8">
                  The short transfer time between the airport and the city center helps turn the
                  entire championship trip into a smooth, premium event experience.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['International Reach', 'Strong network of connections for incoming visitors.'],
                  ['Quick City Access', 'Convenient route from landing to hotel, arena, and city center.'],
                  ['Travel-Friendly', 'Ideal for spectators, teams, and global event partners.'],
                  ['Event Advantage', 'Easy logistics increase the appeal of attending live.'],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
                  >
                    <div className="text-lg font-black uppercase">{title}</div>
                    <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
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
                  Accommodation
                </div>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                  Strong hotel base for athletes and fans
                </h2>
                <p className="mt-6 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                  Kraków offers a wide accommodation range for every type of visitor — from premium
                  hotels to practical options for teams, families, and international supporters.
                </p>
                <p className="mt-4 text-base leading-7 text-white/65 sm:leading-8">
                  This makes the city ideal for a multi-day championship experience with thousands
                  of incoming guests.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Premium Hotels', 'Comfortable options for VIP guests, partners, and business visitors.'],
                  ['Mid-Range Options', 'A broad selection for teams, spectators, and longer stays.'],
                  ['City-Center Stays', 'Easy access to restaurants, sightseeing, and event-week atmosphere.'],
                  ['Group-Friendly', 'Flexible lodging choices for clubs, crews, and families.'],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-[2rem] border border-white/10 bg-black/60 p-6 text-center backdrop-blur-xl"
                  >
                    <div className="text-lg font-black uppercase">{title}</div>
                    <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
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
                Tickets
              </div>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                Be there when history is made
              </h2>
              <p className="mt-6 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                Secure your place for one of the biggest weekends in grappling. Premium seats,
                world-level action, and a live arena experience built for true fans of the sport.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-amber-400/30 bg-gradient-to-r from-amber-400/15 to-white/[0.04] p-8 text-center shadow-2xl shadow-black/30">
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
                Official Ticket Info
              </div>
              <h3 className="mt-3 text-2xl font-black uppercase sm:text-3xl">
                Tickets available via official sales partner
              </h3>
              <div className="mt-6 flex justify-center">
                <a
                  href="https://www.ebilet.pl/en/sport/sporty-walki/adcc-world-championship"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition duration-300 hover:border-amber-400 hover:text-amber-400"
                >
                  Tickets
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="sponsors" className="border-b border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">
                Sponsors
              </div>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                Align your brand with a global combat sports property
              </h2>
              <p className="mt-6 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                ADCC offers access to a deeply engaged international audience through premium event
                branding, digital exposure, social media integration, and direct association with
                the biggest stage in the sport.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {sponsorTiers.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-[2rem] border border-white/10 bg-black/60 p-7 text-center backdrop-blur-xl"
                >
                  <h3 className="text-2xl font-black uppercase">{tier.name}</h3>
                  <div className="mt-5 space-y-3 text-sm leading-7 text-white/70">
                    {tier.points.map((point) => (
                      <div key={point}>• {point}</div>
                    ))}
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
                  Contact
                </div>
                <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
                  Let’s build something big
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                  For partnerships, media opportunities, and event communication, use the contact
                  details below.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
                <div className="space-y-5 text-sm leading-7 text-white/75">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/45">Email</div>
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