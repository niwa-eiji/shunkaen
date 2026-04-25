/* Shunkaen — Booking form (multi-step, tentative reservation) */
const { useState: useBState, useMemo: useBMemo } = React;

function BookingForm({ c, lang }) {
  const L = c.booking;
  const [step, setStep] = useBState(0);
  const [courseIdx, setCourseIdx] = useBState(null);
  const [people, setPeople] = useBState(2);
  const [dateIdx, setDateIdx] = useBState(null);
  const [timeIdx, setTimeIdx] = useBState(null);
  const [country, setCountry] = useBState("");
  const [name, setName] = useBState("");
  const [email, setEmail] = useBState("");
  const [notes, setNotes] = useBState("");
  const [submitted, setSubmitted] = useBState(false);
  const [ref, setRef] = useBState("");

  const dates = useBMemo(() => {
    const out = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      out.push(d);
    }
    return out;
  }, []);
  const times = ["10:00", "11:30", "13:00", "14:30", "16:00"];
  const dowEn = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const dowJp = ["日","月","火","水","木","金","土"];

  const course = courseIdx !== null ? c.experiences.rows[courseIdx] : null;
  const priceNum = course ? parseInt(course.price.replace(/[^\d]/g, ""), 10) : 0;
  const total = priceNum * people;

  const canNext = [
    courseIdx !== null,
    people >= 1,
    dateIdx !== null && timeIdx !== null,
    country && name && /.+@.+\..+/.test(email)
  ][step];

  const submit = () => {
    setRef("SK-" + Math.random().toString(36).slice(2, 7).toUpperCase());
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="block booking" id="book" data-screen-label="Booking">
        <div className="booking-wrap">
          <div className="booking-card">
            <div className="success">
              <div className="seal-big">印</div>
              <h3 style={{ fontFamily: "var(--serif-jp)", fontWeight: 300, fontSize: "clamp(28px,4vw,44px)", margin: "0 0 12px", letterSpacing: "0.04em" }}>{L.success.h}</h3>
              <p style={{ fontFamily: "var(--serif-display)", fontStyle: "italic", fontSize: 18, color: "var(--ink-muted)", margin: "0 0 24px" }}>{L.success.sub}</p>
              <p style={{ fontSize: 14, lineHeight: 2, color: "var(--sumi-2)", maxWidth: 480, margin: "0 auto 32px", letterSpacing: "0.04em" }}>{L.success.body}</p>
              <div style={{ display: "inline-flex", gap: 14, alignItems: "baseline", padding: "12px 20px", border: "1px solid var(--line)", background: "var(--paper-2)", marginBottom: 40 }}>
                <span style={{ fontFamily: "var(--serif-display)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{L.success.ref}</span>
                <span style={{ fontFamily: "var(--serif-display)", fontStyle: "italic", fontSize: 20 }}>{ref}</span>
              </div>
              <div>
                <button className="btn btn-outline-dark" onClick={() => {
                  setSubmitted(false); setStep(0); setCourseIdx(null); setPeople(2);
                  setDateIdx(null); setTimeIdx(null); setCountry(""); setName(""); setEmail(""); setNotes("");
                }}>{L.labels.newBooking} <span className="arrow" /></button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="block booking" id="book" data-screen-label="Booking">
      <SectionHead data={c} dataKey="booking" lang={lang} />
      <div className="booking-wrap">
        <div className="booking-card">
          <div className="step-indicator">
            {L.steps.map((s, i) => (
              <div key={i} className={`step-dot ${i < step ? "done" : ""} ${i === step ? "active" : ""}`}>
                <span className="n">{String(i+1).padStart(2,"0")} · {s}</span>
              </div>
            ))}
          </div>

          {/* STEP 1 — COURSE */}
          <div className={`step ${step === 0 ? "active" : ""}`}>
            <h3>{L.step1.h}</h3>
            <p className="step-sub">{L.step1.sub}</p>
            <div className="course-list">
              {c.experiences.rows.map((r, i) => (
                <button key={i} className={`course-option ${courseIdx === i ? "selected" : ""}`} onClick={() => setCourseIdx(i)}>
                  <div>
                    <div className="c-title">{r.title} <span style={{ opacity: 0.6, fontSize: "0.7em" }}>· {r.titleJp}</span></div>
                    <div className="c-meta">{r.meta}</div>
                  </div>
                  <div className="c-price">{r.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2 — PEOPLE */}
          <div className={`step ${step === 1 ? "active" : ""}`}>
            <h3>{L.step2.h}</h3>
            <p className="step-sub">{L.step2.sub}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap", padding: "40px 0" }}>
              <div className="counter">
                <button onClick={() => setPeople(Math.max(1, people - 1))} disabled={people <= 1}>−</button>
                <span className="n">{people}</span>
                <button onClick={() => setPeople(Math.min(8, people + 1))} disabled={people >= 8}>+</button>
              </div>
              <div style={{ color: "var(--ink-muted)", fontSize: 13, letterSpacing: "0.05em", lineHeight: 1.8 }}>
                {people === 1 ? (lang === "jp" ? "お一人様" : "One guest") : (lang === "jp" ? `${people}名様` : `${people} guests`)}
                <br/>
                <span style={{ fontFamily: "var(--serif-display)", fontStyle: "italic" }}>max. 8</span>
              </div>
            </div>
          </div>

          {/* STEP 3 — DATE/TIME */}
          <div className={`step ${step === 2 ? "active" : ""}`}>
            <h3>{L.step3.h}</h3>
            <p className="step-sub">{L.step3.sub}</p>
            <div style={{ fontFamily: "var(--serif-display)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 12 }}>
              {lang === "jp" ? "日付" : "Date"}
            </div>
            <div className="date-grid">
              {dates.map((d, i) => {
                const isMonday = d.getDay() === 1;
                return (
                  <button key={i} className={`date-cell ${dateIdx === i ? "selected" : ""}`} onClick={() => setDateIdx(i)} disabled={isMonday}>
                    <span className="dow">{(lang === "jp" ? dowJp : dowEn)[d.getDay()]}</span>
                    <span className="d">{d.getDate()}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ fontFamily: "var(--serif-display)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink-muted)", margin: "16px 0 12px" }}>
              {lang === "jp" ? "時間" : "Time"}
            </div>
            <div className="time-row">
              {times.map((t, i) => (
                <button key={i} className={`time-cell ${timeIdx === i ? "selected" : ""}`} onClick={() => setTimeIdx(i)}>{t}</button>
              ))}
            </div>
          </div>

          {/* STEP 4 — DETAILS */}
          <div className={`step ${step === 3 ? "active" : ""}`}>
            <h3>{L.step4.h}</h3>
            <p className="step-sub">{L.step4.sub}</p>

            <div className="summary">
              <div className="summary-row"><span className="k">{L.kicker}</span><span>{course ? `${course.title} · ${course.titleJp}` : "—"}</span></div>
              <div className="summary-row"><span className="k">{L.labels.people}</span><span>{people}</span></div>
              <div className="summary-row"><span className="k">{lang === "jp" ? "日時" : "When"}</span>
                <span>{dateIdx !== null && dates[dateIdx] ? `${dates[dateIdx].getMonth()+1}/${dates[dateIdx].getDate()}` : "—"} · {timeIdx !== null ? times[timeIdx] : "—"}</span>
              </div>
              <div className="summary-row total">
                <span className="k">{L.labels.total}</span>
                <span>¥{total.toLocaleString()} <span style={{ fontFamily: "var(--sans-jp)", fontSize: 11, color: "var(--ink-muted)", letterSpacing: "0.1em" }}>(¥{priceNum.toLocaleString()} {L.labels.perGuest} × {people})</span></span>
              </div>
            </div>

            <div className="field-row">
              <label className="field">
                <span className="f-label">{L.labels.name}</span>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
              </label>
              <label className="field">
                <span className="f-label">{L.labels.email}</span>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </label>
            </div>
            <label className="field">
              <span className="f-label">{L.labels.country}</span>
              <select value={country} onChange={e => setCountry(e.target.value)}>
                <option value="">{L.labels.selectCountry}</option>
                {SHUNKAEN_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label className="field">
              <span className="f-label">{L.labels.notes}</span>
              <textarea rows="2" value={notes} onChange={e => setNotes(e.target.value)} />
            </label>

            <div className="note"><strong>{lang === "jp" ? "ご注意" : "Please note"} —</strong> {L.note}</div>
          </div>

          <div className="form-nav">
            {step > 0 ? (
              <button className="btn btn-outline-dark" onClick={() => setStep(step - 1)} style={{ padding: "14px 22px" }}>
                ← {L.labels.back}
              </button>
            ) : <span />}
            {step < 3 ? (
              <button className="btn btn-dark" onClick={() => canNext && setStep(step + 1)} disabled={!canNext} style={{ opacity: canNext ? 1 : 0.35, pointerEvents: canNext ? "auto" : "none", padding: "14px 26px" }}>
                {L.labels.next} <span className="arrow" />
              </button>
            ) : (
              <button className="btn btn-dark" onClick={submit} disabled={!canNext} style={{ opacity: canNext ? 1 : 0.35, pointerEvents: canNext ? "auto" : "none", padding: "14px 26px" }}>
                {L.labels.submit} <span className="arrow" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

window.BookingForm = BookingForm;
