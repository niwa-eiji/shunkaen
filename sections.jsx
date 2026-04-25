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
        <Reveal className="section-num">{d.num}</Reveal>
        <Reveal delay={1}><div className="section-kicker">{d.kicker}</div></Reveal>
        <Reveal delay={2}>
          <h2 className="section-title">
            {d.title.split("\n").map((l, i) => <span key={i} style={{display:"block"}}>{l}</span>)}
            {d.titleJp && <span className="en">— {d.titleJp}</span>}
          </h2>
        </Reveal>
      </div>
      {d.lead && <Reveal delay={3}><p className="section-lead">{d.lead}</p></Reveal>}
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
        <div className="hero-bg" ref={bgRef} style={{ backgroundImage: "url('images/images_main_img1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
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
          <div className="hero-bg" ref={bgRef} style={{ left: 0, backgroundImage: "url('images/images_main_img1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        </div>
      </section>
    );
  }

  // default — fullbleed overlay
  return (
    <section className="hero" data-screen-label="Hero">
      <div className="hero-bg" ref={bgRef} style={{ backgroundImage: "url('images/images_main_img1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
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
// MARQUEE
// ============================================================
function Marquee() {
  const words = ["盆栽", "Bonsai", "茶道", "Sadō", "書道", "Shodō", "着物", "Kimono", "四季", "Shiki", "春花園", "Shunkaen"];
  const tokens = [...words, ...words];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {tokens.map((t, i) => (
          /[A-Za-z]/.test(t) ? <span key={i} className="en">{t}</span> : <span key={i}>{t}</span>
        ))}
      </div>
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
          <Photo label="1000-yr Juniperus — flagship" src="images/images_main_img2.jpg" style={{ width: "100%", height: "100%" }} />
        </InkReveal>
        <div className="collection-sub">
          <InkReveal className="tile"><Photo label="Pine · 400y" src="images/images_t11.jpg" style={{ width: "100%", height: "100%" }} /></InkReveal>
          <InkReveal className="tile"><Photo label="Maple · autumn" src="images/images_t12.jpg" style={{ width: "100%", height: "100%" }} /></InkReveal>
          <InkReveal className="tile wide"><Photo label="Display alcove — tokonoma" src="images/images_main_img3.jpg" style={{ width: "100%", height: "100%" }} /></InkReveal>
        </div>
      </div>
      <div className="stats-row">
        {c.collection.stats.map((s, i) => (
          <Reveal key={i} className="stat" delay={i + 1}>
            <span className="cap">{s.cap}</span>
            <span className="big"><CountUp value={s.big} /> <span className="unit">{s.unit}</span></span>
            <span className="desc">{s.desc}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CountUp({ value }) {
  // animate numeric prefix only
  const match = String(value).match(/^(\D*)(\d[\d,\.]*)(.*)$/);
  const ref = useRef(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const target = parseFloat(match[2].replace(/,/g, ""));
          if (Number.isFinite(target)) {
            const duration = 1400;
            const start = performance.now();
            const step = (now) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              const v = Math.floor(target * eased);
              setShown(`${match[1]}${v.toLocaleString()}${match[3]}`);
              if (t < 1) requestAnimationFrame(step);
              else setShown(value);
            };
            requestAnimationFrame(step);
          }
          io.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return <span ref={ref}>{shown}</span>;
}

// ============================================================
// EXPERIENCES
// ============================================================
function Experiences({ c, lang, onBook }) {
  return (
    <section className="block" id="experiences" data-screen-label="Experiences" style={{ background: "var(--paper)" }}>
      <SectionHead data={c} dataKey="experiences" lang={lang} />
      <div className="exp-list">
        {c.experiences.rows.map((row, i) => (
          <Reveal key={i} className="exp-row" delay={1}>
            <div onClick={onBook} style={{ display: "contents" }}>
              <span className="exp-num">{row.no}</span>
              <h3 className="exp-title">
                {row.title}
                <span className="en">{row.titleJp}</span>
              </h3>
              <p className="exp-desc">{row.desc}</p>
              <div className="exp-price">
                {row.price}
                <span className="meta">{row.meta}</span>
              </div>
              <span className="exp-cta">{c.booking.kicker} <span className="arrow" style={{ width: 16, height: 1, background: "currentColor", position: "relative" }}>
                <span style={{ position: "absolute", right: 0, top: -3, width: 7, height: 7, borderTop: "1px solid currentColor", borderRight: "1px solid currentColor", transform: "rotate(45deg)" }} />
              </span></span>
              <div className="exp-image">
                <Photo label={row.title} src={["images/images_t1.jpg","images/images_t2.jpg","images/images_t3.jpg","images/images_t4.jpg"][i]} style={{ width: "100%", height: "100%" }} />
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
          <Photo label="Kobayashi Kunio · portrait" src="images/images_main_img4.jpg" style={{ width: "100%", height: "100%" }} />
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
    { label: "Spring · plum bloom", cls: "feat",       src: "images/images_main_img1.jpg" },
    { label: "Summer · moss",       cls: "small tall", src: "images/images_t13.jpg" },
    { label: "Autumn · maple",      cls: "",           src: "images/images_t14.jpg" },
    { label: "Winter · snow",       cls: "",           src: "images/images_t15.jpg" },
    { label: "Tea room",            cls: "",           src: "images/images_t2.jpg" },
    { label: "Tokonoma display",    cls: "wide",       src: "images/images_main_img3.jpg" },
    { label: "Workshop in session", cls: "",           src: "images/images_t5.jpg" },
    { label: "Master at work",      cls: "",           src: "images/images_main_img4.jpg" },
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
// TESTIMONIALS
// ============================================================
function Testimonials({ c, lang }) {
  return (
    <section className="block" data-screen-label="Testimonials">
      <SectionHead data={c} dataKey="testimonials" lang={lang} />
      <div className="testimonials">
        {c.testimonials.items.map((t, i) => (
          <Reveal key={i} className="testi" delay={i + 1}>
            <div className="stars">✦ ✦ ✦ ✦ ✦</div>
            <blockquote>"{t.q}"</blockquote>
            <cite>{t.who} <span className="country">{t.country}</span></cite>
          </Reveal>
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
  Hero, Marquee, Collection, Experiences, Master, Visit, Gallery, Testimonials, FAQ, Footer
});
