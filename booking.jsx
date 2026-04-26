/* Shunkaen — Booking / Inquiry form */
const { useState: useBState } = React;

function BookingForm({ c, lang }) {
  const L = c.booking;
  const [name, setName] = useBState("");
  const [email, setEmail] = useBState("");
  const [experience, setExperience] = useBState("");
  const [date, setDate] = useBState("");
  const [notes, setNotes] = useBState("");
  const [submitted, setSubmitted] = useBState(false);
  const [ref, setRef] = useBState("");

  const canSubmit = name.trim() && /.+@.+\..+/.test(email);

  const submit = (e) => {
    e.preventDefault();
    setRef("SK-" + Math.random().toString(36).slice(2, 7).toUpperCase());
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="block booking" id="book" data-screen-label="Booking">
        <div className="inquiry-wrap">
          <div className="inquiry-success">
            <div className="seal-big">印</div>
            <h3 className="inquiry-success-h">{L.success.h}</h3>
            <p className="inquiry-success-sub">{L.success.sub}</p>
            <p className="inquiry-success-body">{L.success.body}</p>
            <div className="inquiry-ref">
              <span>{L.success.ref}</span>
              <span>{ref}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const today = new Date().toLocaleDateString(
    lang === "jp" ? "ja-JP" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <section className="block booking" id="book" data-screen-label="Booking">
      <SectionHead data={c} dataKey="booking" lang={lang} />
      <div className="inquiry-wrap">
        <form className="inquiry-form" onSubmit={submit}>
          <div className="inquiry-letterhead">
            <span className="inquiry-to">
              {lang === "jp" ? "春花園 盆栽美術館 御中" : "To: Shunkaen Bonsai Museum"}
            </span>
            <span className="inquiry-date">{today}</span>
          </div>
          <div className="inquiry-divider" />
          <div className="inquiry-fields">
            <label className="inq-field">
              <span className="inq-label">{L.labels.name}</span>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </label>
            <label className="inq-field">
              <span className="inq-label">{L.labels.email}</span>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label className="inq-field">
              <span className="inq-label">{lang === "jp" ? "ご希望の体験" : "Experience"}</span>
              <select value={experience} onChange={e => setExperience(e.target.value)}>
                <option value="">{lang === "jp" ? "— お選びください —" : "— Select —"}</option>
                {c.experiences.rows.map((r, i) => (
                  <option key={i} value={r.title}>{r.title} · {r.meta}</option>
                ))}
              </select>
            </label>
            <label className="inq-field">
              <span className="inq-label">{lang === "jp" ? "ご希望の日程" : "Preferred date"}</span>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </label>
            <label className="inq-field inq-field-full">
              <span className="inq-label">{L.labels.notes}</span>
              <textarea rows="4" value={notes} onChange={e => setNotes(e.target.value)} />
            </label>
          </div>
          <p className="inquiry-note">{L.note}</p>
          <button
            className="inquiry-submit"
            type="submit"
            disabled={!canSubmit}
            style={{ opacity: canSubmit ? 1 : 0.38 }}
          >
            {L.labels.submit} <span className="arrow" />
          </button>
        </form>
      </div>
    </section>
  );
}

window.BookingForm = BookingForm;
