/* Shunkaen — main app */
const { useState: useAState, useEffect: useAEffect, useRef: useARef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "paper",
  "typography": "serif",
  "density": "default",
  "animation": "full",
  "hero": "overlay",
  "defaultLang": "en"
}/*EDITMODE-END*/;

function App() {
  const [lang, setLang] = useAState(TWEAK_DEFAULTS.defaultLang);
  const [tweaks, setTweaks] = useAState(TWEAK_DEFAULTS);
  const [mobileOpen, setMobileOpen] = useAState(false);
  const [scrolled, setScrolled] = useAState(false);
  const [heroVisible, setHeroVisible] = useAState(true);
  const [panelOpen, setPanelOpen] = useAState(false);

  const c = SHUNKAEN_CONTENT[lang];
  const heroRef = useARef(null);

  // scroll state for navbar
  useAEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setHeroVisible(window.scrollY < window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // apply tweak attrs
  useAEffect(() => {
    const body = document.body;
    body.setAttribute("data-palette", tweaks.palette === "paper" ? "" : tweaks.palette);
    body.setAttribute("data-type", tweaks.typography === "serif" ? "" : tweaks.typography);
    body.setAttribute("data-density", tweaks.density === "default" ? "" : tweaks.density);
    body.setAttribute("data-anim", tweaks.animation === "full" ? "" : (tweaks.animation === "off" ? "0" : "low"));
    window.__setPanelOpen = setPanelOpen;
  }, [tweaks]);

  // Tweaks host protocol
  useAEffect(() => {
    const onMsg = (e) => {
      const t = e.data && e.data.type;
      if (t === "__activate_edit_mode") setPanelOpen(true);
      else if (t === "__deactivate_edit_mode") setPanelOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const updateTweak = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileOpen(false);
  };
  const scrollToBook = () => scrollTo("book");

  useAEffect(() => {
    document.body.classList.toggle("no-scroll", mobileOpen);
  }, [mobileOpen]);

  return (
    <>
      {/* TOP BAR */}
      <header className={`topbar ${scrolled ? "scrolled" : ""} ${heroVisible && !scrolled ? "hero-light" : ""}`}>
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <span className="kanji">春花園</span>
          <span className="romaji">Shunkaen</span>
        </a>
        <nav className="nav-links">
          <a href="#collection" onClick={(e) => { e.preventDefault(); scrollTo("collection"); }}>{c.nav.collection}</a>
          <a href="#experiences" onClick={(e) => { e.preventDefault(); scrollTo("experiences"); }}>{c.nav.experiences}</a>
          <a href="#master" onClick={(e) => { e.preventDefault(); scrollTo("master"); }}>{c.nav.master}</a>
          <a href="#visit" onClick={(e) => { e.preventDefault(); scrollTo("visit"); }}>{c.nav.visit}</a>
          <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo("gallery"); }}>{c.nav.gallery}</a>
        </nav>
        <div className="nav-right">
          <div className="lang-toggle">
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
            <span className="sep">/</span>
            <button className={lang === "jp" ? "active" : ""} onClick={() => setLang("jp")}>JP</button>
          </div>
          <button className="book-btn" onClick={scrollToBook}>{c.nav.book}</button>
          <button className={`menu-btn ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span /><span />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <a href="#collection" onClick={(e) => { e.preventDefault(); scrollTo("collection"); }}>{c.nav.collection}</a>
        <a href="#experiences" onClick={(e) => { e.preventDefault(); scrollTo("experiences"); }}>{c.nav.experiences}</a>
        <a href="#master" onClick={(e) => { e.preventDefault(); scrollTo("master"); }}>{c.nav.master}</a>
        <a href="#visit" onClick={(e) => { e.preventDefault(); scrollTo("visit"); }}>{c.nav.visit}</a>
        <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo("gallery"); }}>{c.nav.gallery}</a>
        <a href="#book" onClick={(e) => { e.preventDefault(); scrollToBook(); }} style={{ color: "var(--moss-deep)" }}>{c.nav.book} →</a>
        <div className="mm-meta">
          10:00 — 17:00 · Closed Mondays<br/>
          +81 3-3670-8622
        </div>
      </div>

      {/* LEAVES (animation intensity permitting) */}
      <Leaves enabled={tweaks.animation === "full"} />

      {/* HERO */}
      <Hero c={c} onBook={scrollToBook} heroVariant={tweaks.hero} />

      {/* SECTIONS */}
      <Collection c={c} lang={lang} />
      <Experiences c={c} lang={lang} onBook={scrollToBook} />
      <Master c={c} lang={lang} />
      <Visit c={c} lang={lang} />
      <BookingForm c={c} lang={lang} />
      <Gallery c={c} lang={lang} />
      <Testimonials c={c} lang={lang} />
      <FAQ c={c} lang={lang} />
      <Footer c={c} />

      {/* TWEAKS */}
      <TweaksPanel open={panelOpen} onClose={() => { setPanelOpen(false); window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*"); }}>
        <TweakSection label="Palette">
          <TweakRadio value={tweaks.palette} onChange={v => updateTweak("palette", v)} options={[
            { value: "paper", label: "Paper" },
            { value: "warm", label: "Warm" },
            { value: "moss", label: "Moss" },
            { value: "sumi", label: "Sumi (dark)" }
          ]} />
        </TweakSection>
        <TweakSection label="Typography">
          <TweakRadio value={tweaks.typography} onChange={v => updateTweak("typography", v)} options={[
            { value: "serif", label: "Mincho serif" },
            { value: "modern", label: "Modern display" },
            { value: "sans", label: "Sans only" }
          ]} />
        </TweakSection>
        <TweakSection label="Whitespace">
          <TweakRadio value={tweaks.density} onChange={v => updateTweak("density", v)} options={[
            { value: "compact", label: "Compact" },
            { value: "default", label: "Default" },
            { value: "airy", label: "Extra airy" }
          ]} />
        </TweakSection>
        <TweakSection label="Animation">
          <TweakRadio value={tweaks.animation} onChange={v => updateTweak("animation", v)} options={[
            { value: "off", label: "Off" },
            { value: "low", label: "Subtle" },
            { value: "full", label: "Full" }
          ]} />
        </TweakSection>
        <TweakSection label="Hero layout">
          <TweakRadio value={tweaks.hero} onChange={v => updateTweak("hero", v)} options={[
            { value: "overlay", label: "Full-bleed overlay" },
            { value: "centered", label: "Centered" },
            { value: "split", label: "Split photo/text" }
          ]} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// ============================================================
// FALLING LEAVES — very subtle
// ============================================================
function Leaves({ enabled }) {
  const ref = useARef(null);
  useAEffect(() => {
    if (!enabled || !ref.current) return;
    const container = ref.current;
    const count = 8;
    const leaves = [];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "leaf";
      el.innerHTML = `<svg viewBox="0 0 20 20"><path d="M10 2 C4 6 4 14 10 18 C16 14 16 6 10 2 Z" fill="rgba(94,112,84,0.22)" stroke="rgba(94,112,84,0.35)" stroke-width="0.4"/></svg>`;
      container.appendChild(el);
      leaves.push({
        el,
        x: Math.random() * window.innerWidth,
        y: Math.random() * -window.innerHeight,
        vy: 0.15 + Math.random() * 0.25,
        vx: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 360,
        vr: (Math.random() - 0.5) * 0.4,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.005 + Math.random() * 0.01,
        size: 10 + Math.random() * 16
      });
    }
    leaves.forEach(l => { l.el.style.width = `${l.size}px`; l.el.style.height = `${l.size}px`; l.el.style.opacity = "0.9"; });

    let raf;
    const tick = () => {
      leaves.forEach(l => {
        l.sway += l.swaySpeed;
        l.x += l.vx + Math.sin(l.sway) * 0.3;
        l.y += l.vy;
        l.r += l.vr;
        if (l.y > window.innerHeight + 40) {
          l.y = -40;
          l.x = Math.random() * window.innerWidth;
        }
        l.el.style.transform = `translate3d(${l.x}px, ${l.y}px, 0) rotate(${l.r}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      leaves.forEach(l => l.el.remove());
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div className="leaves" ref={ref} aria-hidden="true" />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
