/* Shunkaen — section components */
const { useState, useEffect, useRef } = React;

function Photo({ label, src, className = "", dark = false, style }) {
  if (src) {
    return (
      <img src={src} alt={label} className={className}
        style={{ objectFit: "cover", width: "100%", height: "100%", display: "block", ...style }} />
    );
  }
  return (
    <div className={`placeholder ${dark ? "dark" : ""} ${className}`} style={style}>
      <span className="ph-label">{label}</span>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { el.classList.add("in-view"); io.unobserve(el); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${delay ? `delay-${delay}` : ""} ${className}`}>{children}</Tag>;
}

function InkReveal({ children, className = "", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { el.classList.add("in-view"); io.unobserve(el); }
      });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`ink-reveal ${className}`} {...rest}>{children}</div>;
}

function SectionHead({ data, dataKey, lang }) {
  const d = data[dataKey];
  return (
    <header className="section-head">
      <div>
        <Reveal><div className="section-kicker">{d.kicker}</div></Reveal>
        <Reveal delay={1}>
          <h2 className="section-title">
            {d.title.split("\n").map((l, i) => <span key={i} style={{display:"block"}}>{l}</span>)}
          </h2>
        </Reveal>
      </div>
      {d.lead && <Reveal delay={2}><p className="section-lead">{d.lead}</p></Reveal>}
    </header>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero({ c, onBook, heroVariant }) {
  const bgRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      const y = window.scrollY;
      bgRef.current.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(${1 + y * 0.0003})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const splitTitle = (line) =>
    <span className="line"><span>{line}</span></span>;

  // hero layout variants
  if (heroVariant === "centered") {
    return (
      <section className="hero" style={{ alignItems: "center", textAlign: "center" }} data-screen-label="Hero">
        <div className="hero-bg" ref={bgRef} style={{ backgroundImage: "url('images/ig/622047117_18052708460448070_546930324031864727_n.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="hero-inner" style={{ margin: "0 auto" }}>
          <div className="hero-eyebrow" style={{ justifyContent: "center" }}>{c.hero.eyebrow}</div>
          <h1>
            {c.hero.title.map((l, i) => <React.Fragment key={i}>{splitTitle(l)}</React.Fragment>)}
          </h1>
          <p className="hero-sub" style={{ margin: "0 auto 48px" }}>{c.hero.sub}</p>
          <div className="hero-ctas" style={{ justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={onBook}>{c.hero.ctaPrimary} <span className="arrow" /></button>
          </div>
        </div>
        <HeroMeta c={c} />
      </section>
    );
  }

  if (heroVariant === "split") {
    return (
      <section className="hero" style={{ alignItems: "stretch", padding: 0 }} data-screen-label="Hero">
        <div style={{ flex: "1 1 50%", padding: "120px var(--page-pad) 60px", display: "flex", alignItems: "flex-end", background: "var(--paper)", color: "var(--sumi)" }}>
          <div className="hero-inner">
            <div className="hero-eyebrow" style={{ color: "var(--ink-muted)" }}>{c.hero.eyebrow}</div>
            <h1>{c.hero.title.map((l, i) => <React.Fragment key={i}>{splitTitle(l)}</React.Fragment>)}</h1>
            <p className="hero-sub" style={{ color: "var(--sumi-2)", opacity: 1 }}>{c.hero.sub}</p>
            <div className="hero-ctas">
              <button className="btn btn-dark" onClick={onBook}>{c.hero.ctaPrimary} <span className="arrow" /></button>
              <button className="btn btn-outline-dark">{c.hero.ctaSecondary} <span className="arrow" /></button>
            </div>
          </div>
        </div>
        <div style={{ flex: "1 1 50%", position: "relative", background: "#2a2e24", overflow: "hidden" }}>
          <div className="hero-bg" ref={bgRef} style={{ left: 0, backgroundImage: "url('images/ig/622047117_18052708460448070_546930324031864727_n.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        </div>
      </section>
    );
  }

  // default — fullbleed overlay
  return (
    <section className="hero" data-screen-label="Hero">
      <div className="hero-bg" ref={bgRef} style={{ backgroundImage: "url('images/ig/622047117_18052708460448070_546930324031864727_n.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="hero-inner">
        <div className="hero-eyebrow">{c.hero.eyebrow}</div>
        <h1>
          {c.hero.title.map((l, i) => <React.Fragment key={i}>{splitTitle(l)}</React.Fragment>)}
        </h1>
        <p className="hero-sub">{c.hero.sub}</p>
        <div className="hero-ctas">
          <button className="btn btn-primary" onClick={onBook}>{c.hero.ctaPrimary} <span className="arrow" /></button>
          <button className="btn btn-ghost">{c.hero.ctaSecondary} <span className="arrow" /></button>
        </div>
      </div>
      <div className="hero-scroll">Scroll</div>
      <HeroMeta c={c} />
    </section>
  );
}

function HeroMeta({ c }) {
  return (
    <div className="hero-meta">
      {c.meta.map((m, i) => (
        <div key={i} className="m-item">
          <span className="num">{m.num}</span>
          <span>{m.label}</span>
        </div>
      ))}
    </div>
  );
}


// ============================================================
// COLLECTION
// ============================================================
function Collection({ c, lang }) {
  return (
    <section className="block" id="collection" data-screen-label="Collection">
      <SectionHead data={c} dataKey="collection" lang={lang} />
      <div className="collection-grid">
        <InkReveal className="collection-hero">
          <Photo label="1000-yr Juniperus — flagship" src="images/ig/658903488_18520221808075121_1961976977321210351_n.jpg" style={{ width: "100%", height: "100%" }} />
        </InkReveal>
        <div className="collection-sub">
          <InkReveal className="tile"><Photo label="Pine · 400y" src="images/ig/654017249_18108897121773324_7873207007404928352_n.jpg" style={{ width: "100%", height: "100%" }} /></InkReveal>
          <InkReveal className="tile"><Photo label="Azalea in bloom" src="images/ig/651611733_18081668141034989_1734327019013847065_n.jpg" style={{ width: "100%", height: "100%" }} /></InkReveal>
          <InkReveal className="tile wide"><Photo label="Display alcove — tokonoma" src="images/ig/649212500_18096489650315493_1207309345604313147_n.jpg" style={{ width: "100%", height: "100%" }} /></InkReveal>
        </div>
      </div>
      <div className="stats-row">
        {c.collection.stats.map((s, i) => (
          <Reveal key={i} className="stat" delay={i + 1}>
            <span className="cap">{s.cap}</span>
            <span className="big">{s.big} <span className="unit">{s.unit}</span></span>
            <span className="desc">{s.desc}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}


// ============================================================
// EXPERIENCES
// ============================================================
function Experiences({ c, lang, onBook }) {
  const photos = [
    "images/ig/658903488_18520221808075121_1961976977321210351_n.jpg",
    "images/ig/649212500_18096489650315493_1207309345604313147_n.jpg",
    "images/ig/655029492_18146238745463965_8791533735005858191_n.jpg",
    "images/ig/501564605_1186490680154877_2899874138990604350_n.jpg",
  ];
  return (
    <section className="block" id="experiences" data-screen-label="Experiences">
      <SectionHead data={c} dataKey="experiences" lang={lang} />
      <div className="exp-photo-grid">
        {c.experiences.rows.map((row, i) => (
          <Reveal key={i} className="exp-photo-item">
            <div className="exp-photo-wrap" onClick={onBook}>
              <Photo label={row.title} src={photos[i]} />
              <div className="exp-photo-caption">
                <div className="exp-photo-title">{row.title}</div>
                <div className="exp-photo-sub">{row.meta}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// MASTER
// ============================================================
function Master({ c, lang }) {
  return (
    <section className="block about" id="master" data-screen-label="Master">
      <SectionHead data={c} dataKey="master" lang={lang} />
      <div className="about-grid">
        <InkReveal className="about-portrait">
          <Photo label="Kobayashi Kunio · portrait" src="images/ig/621568848_18116328709606171_2324010081377099115_n.jpg" style={{ width: "100%", height: "100%" }} />
        </InkReveal>
        <Reveal className="about-body">
          <p className="quote">{c.master.quote}</p>
          <p>{c.master.body1}</p>
          <p>{c.master.body2}</p>
          <div className="about-sign">
            <div>
              <div className="name">{c.master.name}</div>
              <div className="title">{c.master.role}</div>
            </div>
            <div className="seal">印</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// VISIT
// ============================================================
function Visit({ c, lang }) {
  return (
    <section className="block" id="visit" data-screen-label="Visit">
      <SectionHead data={c} dataKey="visit" lang={lang} />
      <div className="visit-grid">
        <Reveal className="info-list">
          {c.visit.info.map((row, i) => (
            <div key={i} className="info-item">
              <span className="label">{row.label}</span>
              <span className="value">
                {row.value}
                {row.sub && <span className="sub">{row.sub}</span>}
              </span>
            </div>
          ))}
        </Reveal>
        <InkReveal>
          <div className="map-frame">
            <div className="map-ph" />
            <div className="map-pin">
              <span className="dot" />
              <span className="label">春花園 · Shunkaen</span>
            </div>
            <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
              Edogawa-ku, Tokyo · 10 min from Mizue Stn
            </div>
          </div>
        </InkReveal>
      </div>
    </section>
  );
}

// ============================================================
// GALLERY
// ============================================================
function Gallery({ c, lang }) {
  const tiles = [
    { label: "Spring · azalea in bloom", cls: "feat",       src: "images/ig/501564605_1186490680154877_2899874138990604350_n.jpg" },
    { label: "Spring · cherry blossom",  cls: "small tall", src: "images/ig/648988386_18075923141408329_7489955223879941930_n.jpg" },
    { label: "Autumn · red plum",        cls: "",           src: "images/ig/655029492_18146238745463965_8791533735005858191_n.jpg" },
    { label: "Winter · tokonoma",        cls: "",           src: "images/ig/649212500_18096489650315493_1207309345604313147_n.jpg" },
    { label: "Garden from inside",       cls: "",           src: "images/ig/652042781_18099147499754840_5931991711157850490_n.jpg" },
    { label: "Garden overview",          cls: "wide",       src: "images/ig/626717582_18392213047199632_5235111951086248765_n.jpg" },
    { label: "Master at work",           cls: "",           src: "images/ig/651999209_18115718473572597_1391146569899234948_n.jpg" },
    { label: "Master explaining",        cls: "",           src: "images/ig/621568848_18116328709606171_2324010081377099115_n.jpg" },
  ];
  return (
    <section className="block" id="gallery" data-screen-label="Gallery" style={{ background: "var(--paper-2)" }}>
      <SectionHead data={c} dataKey="gallery" lang={lang} />
      <div className="gallery">
        {tiles.map((t, i) => (
          <InkReveal key={i} className={`g-cell ${t.cls}`}>
            <Photo label={t.label} src={t.src} style={{ width: "100%", height: "100%" }} />
          </InkReveal>
        ))}
      </div>
    </section>
  );
}


// ============================================================
// FAQ
// ============================================================
function FAQ({ c, lang }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="block" id="faq" data-screen-label="FAQ" style={{ background: "var(--paper)" }}>
      <SectionHead data={c} dataKey="faq" lang={lang} />
      <div className="faq-list">
        {c.faq.items.map((item, i) => (
          <Reveal key={i} className={`faq-item ${open === i ? "open" : ""}`} delay={1}>
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span className="q-text">{item.q}</span>
              <span className="q-toggle" />
            </button>
            <div className="faq-a"><div className="faq-a-inner">{item.a}</div></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ c }) {
  return (
    <footer className="footer" data-screen-label="Footer">
      <Reveal>
        <div className="footer-huge">
          {c.footer.huge}
          <span className="en">{c.footer.hugeEn}</span>
        </div>
      </Reveal>
      <div className="footer-grid">
        <div className="footer-col">
          <h5>About</h5>
          <p>{c.footer.tagline}</p>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", opacity: 0.6 }}>1-29-16 Niihori, Edogawa, Tokyo<br/>〒133-0042 · +81 3-3670-8622</p>
        </div>
        {c.footer.cols.map((col, i) => (
          <div key={i} className="footer-col">
            <h5>{col.h}</h5>
            <ul>
              {col.links.map((l, j) => <li key={j}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-legal">
        <span>{c.footer.legal}</span>
        <span>Site · 2026</span>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Photo, Reveal, InkReveal, SectionHead,
  Hero, Collection, Experiences, Master, Visit, Gallery, FAQ, Footer
});
