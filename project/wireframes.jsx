// wireframes.jsx — SAP Inside Track Paris landing page wireframes
// 4 distinct directions, low-fi sketchy vibe, communautaire/tech moderne

const SIT = {
  date: "25.09.2026",
  city: "Paris",
  venue: "SAP France",
  cap: 80,
  tracks: ["App Dev & Clean Core", "Data, Cloud & Integration", "Business Processes", "Hands-on"],
};

// ───────── primitive sketchy components ─────────

function Box({ children, style = {}, dashed = false, sketchy = true, w, h, ...rest }) {
  const t = window.__wfTheme || {};
  const border = dashed
    ? `1.5px dashed ${t.ink}`
    : `1.5px solid ${t.ink}`;
  return (
    <div
      style={{
        border,
        borderRadius: sketchy ? "8px 10px 7px 9px / 9px 7px 10px 8px" : 4,
        padding: 12,
        background: t.paper,
        width: w,
        height: h,
        boxSizing: "border-box",
        position: "relative",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

function Scribble({ width = "100%", height = 8, lines = 1, gap = 6, color, style = {} }) {
  const t = window.__wfTheme || {};
  const c = color || t.muted;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, ...style }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{
            width: typeof width === "function" ? width(i) : width,
            height,
            background: c,
            borderRadius: 2,
            opacity: 0.55 - i * 0.08,
          }}
        />
      ))}
    </div>
  );
}

function Btn({ children, primary, ghost, style = {}, size = "md" }) {
  const t = window.__wfTheme || {};
  const pad = size === "lg" ? "14px 22px" : size === "sm" ? "6px 12px" : "10px 16px";
  const bg = primary ? t.accent : ghost ? "transparent" : t.paper;
  const fg = primary ? t.paperBright : t.ink;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: pad,
        background: bg,
        color: fg,
        border: `1.5px solid ${t.ink}`,
        borderRadius: "6px 8px 5px 7px / 7px 5px 8px 6px",
        fontWeight: 600,
        fontSize: size === "lg" ? 16 : size === "sm" ? 12 : 14,
        boxShadow: primary ? `3px 3px 0 ${t.ink}` : "none",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function Img({ label = "image", w = "100%", h = 120, style = {} }) {
  const t = window.__wfTheme || {};
  return (
    <div
      style={{
        width: w,
        height: h,
        border: `1.5px solid ${t.ink}`,
        borderRadius: "8px 10px 7px 9px / 9px 7px 10px 8px",
        background: `repeating-linear-gradient(45deg, ${t.paper} 0 8px, ${t.stripe} 8px 9px)`,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <span style={{
        fontFamily: "ui-monospace, 'Courier New', monospace",
        fontSize: 11,
        color: t.muted,
        background: t.paper,
        padding: "2px 6px",
        border: `1px solid ${t.muted}`,
      }}>
        {label}
      </span>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <line x1="0" y1="0" x2="100%" y2="100%" stroke={t.muted} strokeWidth="0.5" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke={t.muted} strokeWidth="0.5" />
      </svg>
    </div>
  );
}

function NavBar({ accent }) {
  const t = window.__wfTheme || {};
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 32px",
      borderBottom: `1.5px solid ${t.ink}`,
      fontFamily: t.sans,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src="assets/sit-paris-logo.png" alt="SIT Paris" style={{ height: 40, width: "auto", display: "block" }} />
      </div>
      <div style={{ display: "flex", gap: 22, fontSize: 13, color: t.muted }}>
        <span>Programme</span>
        <span>Speakers</span>
        <span>Lieu</span>
        <span>Sponsors</span>
        <span>FAQ</span>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 12 }}>
        <span style={{ color: t.muted }}>FR / EN</span>
        <Btn size="sm" primary>S'inscrire</Btn>
      </div>
    </div>
  );
}

function Countdown({ compact }) {
  const t = window.__wfTheme || {};
  const cells = [["143", "JOURS"], ["07", "HEURES"], ["22", "MIN"], ["41", "SEC"]];
  return (
    <div style={{ display: "flex", gap: compact ? 6 : 10 }}>
      {cells.map(([n, l]) => (
        <div key={l} style={{
          border: `1.5px solid ${t.ink}`,
          borderRadius: "6px 8px 5px 7px",
          padding: compact ? "6px 10px" : "10px 14px",
          textAlign: "center",
          minWidth: compact ? 50 : 64,
          background: t.paper,
        }}>
          <div style={{ fontSize: compact ? 18 : 28, fontWeight: 700, fontFamily: t.mono, lineHeight: 1 }}>{n}</div>
          <div style={{ fontSize: 9, color: t.muted, marginTop: 4, letterSpacing: 1 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

// ───────── WIREFRAME 1 — Terminal / dev-conf ─────────

function Wireframe1() {
  const t = window.__wfTheme || {};
  return (
    <div style={{ background: t.paperBright, fontFamily: t.sans, color: t.ink, width: "100%" }}>
      <NavBar />

      {/* HERO — terminal/code style */}
      <div style={{ padding: "48px 32px 56px", borderBottom: `1.5px solid ${t.ink}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: t.mono, fontSize: 12, color: t.accent, marginBottom: 16 }}>
              $ ./first-edition --city=paris
            </div>
            <h1 style={{ fontSize: 64, lineHeight: 0.95, margin: 0, fontWeight: 800, letterSpacing: -1.5 }}>
              SAP<br />Inside Track<br />
              <span style={{ color: t.accent }}>Paris.</span>
            </h1>
            <div style={{ marginTop: 20, fontSize: 18, color: t.muted, maxWidth: 480 }}>
              [tagline — ex: « La communauté SAP francophone se retrouve enfin chez elle. »]
            </div>
            <div style={{ display: "flex", gap: 28, marginTop: 28, fontFamily: t.mono, fontSize: 13 }}>
              <span><span style={{ color: t.muted }}>date</span> → {SIT.date}</span>
              <span><span style={{ color: t.muted }}>venue</span> → {SIT.venue}</span>
              <span><span style={{ color: t.muted }}>cap</span> → {SIT.cap} pax</span>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 32, alignItems: "center" }}>
              <Btn primary size="lg">→ Pre-register</Btn>
              <Btn ghost size="lg">📣 Call for Speakers</Btn>
            </div>
          </div>

          <Box style={{ background: t.ink, color: t.paperBright, padding: 20 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
              <span style={{ marginLeft: "auto", fontFamily: t.mono, fontSize: 10, opacity: 0.6 }}>~/sit-paris</span>
            </div>
            <div style={{ fontFamily: t.mono, fontSize: 13, lineHeight: 1.7 }}>
              <div><span style={{ color: t.muted }}>{">"}</span> countdown --to 25.09.2026</div>
              <div style={{ marginTop: 12, marginBottom: 12 }}>
                <Countdown compact />
              </div>
              <div><span style={{ color: t.muted }}>{">"}</span> tracks --list</div>
              {SIT.tracks.map((tk, i) => (
                <div key={tk} style={{ paddingLeft: 14 }}>
                  <span style={{ color: t.accent }}>›</span> {String(i + 1).padStart(2, "0")} {tk}
                </div>
              ))}
              <div style={{ marginTop: 12 }}>
                <span style={{ color: t.muted }}>{">"}</span> register
                <span style={{ background: t.accent, color: t.ink, marginLeft: 8, padding: "1px 6px" }}>SOON</span>
              </div>
            </div>
          </Box>
        </div>
      </div>

      {/* PROGRAMME — grid 4 tracks */}
      <Section title="// programme" subtitle="4 tracks parallèles · 25 sept. 2026">
        <div style={{ display: "grid", gridTemplateColumns: `120px repeat(4, 1fr)`, gap: 0, border: `1.5px solid ${t.ink}`, borderRadius: 8, overflow: "hidden" }}>
          <div style={{ background: t.ink, color: t.paperBright, padding: 12, fontFamily: t.mono, fontSize: 11 }}>time</div>
          {SIT.tracks.map((tk, i) => (
            <div key={tk} style={{ background: t.ink, color: t.paperBright, padding: 12, fontFamily: t.mono, fontSize: 11, borderLeft: `1px solid ${t.muted}` }}>
              T{i + 1} · {tk}
            </div>
          ))}
          {["09:00", "10:30", "11:45", "14:00", "15:30"].map((time, r) => (
            <React.Fragment key={time}>
              <div style={{ padding: 12, fontFamily: t.mono, fontSize: 11, color: t.muted, borderTop: `1px solid ${t.ink}` }}>{time}</div>
              {[0, 1, 2, 3].map((c) => (
                <div key={c} style={{ padding: 10, borderTop: `1px solid ${t.ink}`, borderLeft: `1px solid ${t.ink}`, minHeight: 70 }}>
                  <Scribble width={(i) => `${80 - i * 15}%`} lines={2} height={5} />
                  <div style={{ fontSize: 9, fontFamily: t.mono, color: t.muted, marginTop: 8 }}>[talk · 30min]</div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </Section>

      {/* SPEAKERS — call for speakers */}
      <Section title="// speakers" subtitle="Tu veux parler ? On t'attend.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                width: "100%", aspectRatio: "1", borderRadius: "50%",
                border: `1.5px dashed ${t.muted}`,
                background: `repeating-linear-gradient(45deg, transparent 0 6px, ${t.stripe} 6px 7px)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: t.mono, fontSize: 10, color: t.muted,
              }}>?</div>
              <Scribble lines={1} width="60%" style={{ marginTop: 10, marginInline: "auto" }} />
            </div>
          ))}
          <Box style={{ aspectRatio: "1", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderStyle: "dashed", padding: 8, textAlign: "center", background: t.accent, color: t.paperBright }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>+ Toi ?</div>
            <div style={{ fontSize: 10, marginTop: 4 }}>Soumettre un talk →</div>
          </Box>
        </div>
      </Section>

      {/* LIEU + SPONSORS combo */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: `1.5px solid ${t.ink}` }}>
        <div style={{ padding: "40px 32px", borderRight: `1.5px solid ${t.ink}` }}>
          <SectionHead title="// lieu" />
          <Img label="map · SAP France · Levallois" h={180} />
          <div style={{ marginTop: 16, fontFamily: t.mono, fontSize: 12, lineHeight: 1.8 }}>
            <div><span style={{ color: t.muted }}>addr</span> → SAP France, 35 rue d'Alsace</div>
            <div><span style={{ color: t.muted }}>metro</span> → L3 Anatole France · 4 min</div>
            <div><span style={{ color: t.muted }}>access</span> → PMR · vélo · parking</div>
          </div>
        </div>
        <div style={{ padding: "40px 32px" }}>
          <SectionHead title="// sponsors" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 12 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Box key={i} h={64} dashed style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 8 }}>
                <span style={{ fontFamily: t.mono, fontSize: 10, color: t.muted }}>logo {i + 1}</span>
              </Box>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Btn ghost size="sm">→ Devenir sponsor</Btn>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <Section title="// faq">
        {[
          "C'est quoi un SAP Inside Track ?",
          "Première édition à Paris, c'est gratuit ?",
          "Qui peut soumettre un talk ?",
          "Y aura-t-il des sessions hands-on ?",
          "Comment être sponsor ?",
        ].map((q, i) => (
          <div key={q} style={{
            padding: "16px 0",
            borderBottom: i < 4 ? `1px solid ${t.muted}` : "none",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <span style={{ fontWeight: 500 }}>{String(i + 1).padStart(2, "0")} · {q}</span>
            <span style={{ fontFamily: t.mono, color: t.accent }}>+</span>
          </div>
        ))}
      </Section>

      <Footer />
    </div>
  );
}

function Section({ title, subtitle, children, dark }) {
  const t = window.__wfTheme || {};
  return (
    <div style={{
      padding: "48px 32px",
      borderBottom: `1.5px solid ${t.ink}`,
      background: dark ? t.ink : "transparent",
      color: dark ? t.paperBright : t.ink,
    }}>
      <SectionHead title={title} subtitle={subtitle} />
      <div style={{ marginTop: 28 }}>{children}</div>
    </div>
  );
}

function SectionHead({ title, subtitle }) {
  const t = window.__wfTheme || {};
  return (
    <div>
      <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0, fontFamily: t.mono, letterSpacing: -0.5 }}>{title}</h2>
      {subtitle && <div style={{ fontSize: 13, color: t.muted, marginTop: 6 }}>{subtitle}</div>}
    </div>
  );
}

function Footer() {
  const t = window.__wfTheme || {};
  return (
    <div style={{
      padding: "32px",
      background: t.ink,
      color: t.paperBright,
      fontFamily: t.mono,
      fontSize: 12,
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 16,
    }}>
      <div>SIT Paris '26 · première édition · 25.09.2026</div>
      <div style={{ display: "flex", gap: 16, opacity: 0.7 }}>
        <span>#SITParis</span>
        <span>LinkedIn</span>
        <span>Mastodon</span>
        <span>community.sap.com</span>
      </div>
    </div>
  );
}

// ───────── WIREFRAME 2 — Magazine éditorial ─────────

function Wireframe2() {
  const t = window.__wfTheme || {};
  return (
    <div style={{ background: t.paperBright, fontFamily: t.sans, color: t.ink, width: "100%" }}>
      {/* masthead */}
      <div style={{
        borderBottom: `3px double ${t.ink}`,
        padding: "12px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontFamily: t.mono, fontSize: 11, color: t.muted }}>VOL. 01 · N°1 · PARIS · SEPT. 2026</span>
        <img src="assets/sit-paris-logo.png" alt="SIT Paris" style={{ height: 32 }} />
        <span style={{ fontFamily: t.mono, fontSize: 11, color: t.muted }}>FR · EN</span>
      </div>

      <div style={{ padding: "0 32px", borderBottom: `1.5px solid ${t.ink}` }}>
        <h1 style={{
          fontFamily: t.serif,
          fontSize: 140,
          lineHeight: 0.85,
          margin: "32px 0 16px",
          fontWeight: 900,
          letterSpacing: -4,
          textAlign: "center",
        }}>
          Inside&nbsp;<em style={{ color: t.accent, fontStyle: "italic" }}>Track</em>
        </h1>
        <div style={{ textAlign: "center", fontFamily: t.mono, fontSize: 13, paddingBottom: 20, color: t.muted }}>
          PARIS · 25 SEPTEMBRE 2026 · {SIT.venue.toUpperCase()} · {SIT.cap} PARTICIPANTS
        </div>
      </div>

      {/* hero — magazine cover */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", borderBottom: `1.5px solid ${t.ink}` }}>
        <div style={{ padding: 32, borderRight: `1.5px solid ${t.ink}` }}>
          <Img label="hero · communauté SAP France" h={360} />
          <div style={{ marginTop: 16, fontFamily: t.serif, fontSize: 22, fontStyle: "italic", lineHeight: 1.4, maxWidth: 600 }}>
            « [Tagline éditorial — ex: La communauté SAP francophone monte enfin sur scène. Première édition. Aucune deuxième chance pour la première fois.] »
          </div>
        </div>
        <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <div style={{ fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 1 }}>DANS CE NUMÉRO</div>
            <ol style={{ fontFamily: t.serif, fontSize: 16, paddingLeft: 24, marginTop: 8, lineHeight: 1.6 }}>
              <li>Programme — 4 tracks</li>
              <li>Call for Speakers</li>
              <li>SAP France, le lieu</li>
              <li>Sponsors fondateurs</li>
              <li>FAQ première édition</li>
            </ol>
          </div>
          <div style={{ borderTop: `1px solid ${t.ink}`, paddingTop: 16 }}>
            <div style={{ fontFamily: t.mono, fontSize: 10, color: t.muted, letterSpacing: 1, marginBottom: 8 }}>OUVERTURE INSCRIPTIONS</div>
            <Countdown />
          </div>
          <Btn primary size="lg">M'inscrire à l'ouverture →</Btn>
        </div>
      </div>

      {/* programme — colonnes journal */}
      <div style={{ padding: "48px 32px", borderBottom: `1.5px solid ${t.ink}` }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: t.mono, fontSize: 11, color: t.muted, letterSpacing: 2 }}>— PROGRAMME —</div>
          <h2 style={{ fontFamily: t.serif, fontSize: 56, margin: "8px 0 0", fontWeight: 700, letterSpacing: -1.5 }}>
            Quatre tracks, une journée.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: `1.5px solid ${t.ink}` }}>
          {SIT.tracks.map((tk, i) => (
            <div key={tk} style={{
              padding: 20,
              borderRight: i < 3 ? `1px solid ${t.ink}` : "none",
              borderBottom: `1.5px solid ${t.ink}`,
            }}>
              <div style={{ fontFamily: t.mono, fontSize: 10, color: t.accent, letterSpacing: 1 }}>TRACK 0{i + 1}</div>
              <h3 style={{ fontFamily: t.serif, fontSize: 22, margin: "8px 0 12px", lineHeight: 1.1, fontWeight: 700 }}>{tk}</h3>
              <Scribble lines={3} height={5} width={(i) => `${85 - i * 10}%`} />
              <div style={{ marginTop: 16, fontFamily: t.mono, fontSize: 10, color: t.muted }}>
                · 5–6 sessions<br />
                · Salle dédiée<br />
                · Q&A · démos
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* speakers */}
      <div style={{ padding: "48px 32px", borderBottom: `1.5px solid ${t.ink}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: t.mono, fontSize: 11, color: t.muted, letterSpacing: 2 }}>— APPEL —</div>
            <h2 style={{ fontFamily: t.serif, fontSize: 48, margin: "4px 0 0", fontWeight: 700, letterSpacing: -1 }}>
              Call for Speakers
            </h2>
          </div>
          <Btn primary size="lg">Soumettre un talk →</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {[
            ["30 min", "Format talk classique"],
            ["10 min", "Lightning talk"],
            ["90 min", "Atelier hands-on"],
            ["15 min", "Retour d'expérience"],
          ].map(([d, l]) => (
            <div key={l}>
              <div style={{ fontFamily: t.serif, fontSize: 42, fontWeight: 700, color: t.accent }}>{d}</div>
              <div style={{ fontFamily: t.serif, fontSize: 16, marginTop: 4 }}>{l}</div>
              <Scribble lines={2} style={{ marginTop: 12 }} />
            </div>
          ))}
        </div>
      </div>

      {/* lieu + sponsors */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: 32, borderRight: `1.5px solid ${t.ink}`, borderBottom: `1.5px solid ${t.ink}` }}>
          <div style={{ fontFamily: t.mono, fontSize: 11, color: t.muted, letterSpacing: 2 }}>— LE LIEU —</div>
          <h2 style={{ fontFamily: t.serif, fontSize: 40, margin: "4px 0 16px", fontWeight: 700 }}>SAP France.</h2>
          <Img label="photo · campus SAP" h={200} />
          <div style={{ fontFamily: t.serif, fontSize: 15, marginTop: 16, lineHeight: 1.6 }}>
            [Description du lieu — siège SAP France à Levallois. Auditorium principal + 3 salles de breakout. Restauration sur place.]
          </div>
        </div>
        <div style={{ padding: 32, borderBottom: `1.5px solid ${t.ink}` }}>
          <div style={{ fontFamily: t.mono, fontSize: 11, color: t.muted, letterSpacing: 2 }}>— SPONSORS —</div>
          <h2 style={{ fontFamily: t.serif, fontSize: 40, margin: "4px 0 16px", fontWeight: 700 }}>Ils rendent ça possible.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 12 }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <Box key={i} h={56} dashed sketchy={false} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: t.mono, fontSize: 10, color: t.muted }}>logo</span>
              </Box>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ — Q/A façon entretien */}
      <div style={{ padding: "48px 32px", borderBottom: `1.5px solid ${t.ink}` }}>
        <div style={{ fontFamily: t.mono, fontSize: 11, color: t.muted, letterSpacing: 2 }}>— FAQ —</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 24 }}>
          {[
            ["C'est quoi exactement, un Inside Track ?", "[Réponse : événement communautaire by SAP people for SAP people…]"],
            ["Pourquoi « première édition » ?", "[Réponse : explication contexte FR…]"],
            ["Combien ça coûte ?", "[Frais symboliques pour la restauration.]"],
            ["Comment on devient speaker ?", "[Via le call for speakers, ouvert jusqu'au…]"],
          ].map(([q, a]) => (
            <div key={q}>
              <div style={{ fontFamily: t.serif, fontSize: 18, fontWeight: 700, fontStyle: "italic" }}>Q. {q}</div>
              <div style={{ fontFamily: t.serif, fontSize: 14, color: t.muted, marginTop: 8, lineHeight: 1.6 }}>R. {a}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

// ───────── WIREFRAME 3 — Bold typographique ─────────

function Wireframe3() {
  const t = window.__wfTheme || {};
  return (
    <div style={{ background: t.paperBright, fontFamily: t.sans, color: t.ink, width: "100%" }}>
      {/* sticky strip */}
      <div style={{
        background: t.accent, color: t.ink,
        padding: "8px 32px",
        fontFamily: t.mono, fontSize: 11, letterSpacing: 1,
        display: "flex", justifyContent: "space-between",
        fontWeight: 700,
      }}>
        <span>★ PREMIÈRE ÉDITION FRANCE · 25.09.2026 · 80 PLACES</span>
        <span>INSCRIPTIONS BIENTÔT →</span>
      </div>

      {/* huge type hero */}
      <div style={{ padding: "32px 32px 0" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontFamily: t.mono, fontSize: 12, color: t.muted,
        }}>
          <img src="assets/sit-paris-logo.png" alt="SIT Paris" style={{ height: 48 }} />
          <span>FR · EN</span>
        </div>

        <div style={{ marginTop: 24 }}>
          {["SAP", "INSIDE", "TRACK"].map((w, i) => (
            <div key={w} style={{
              fontSize: "clamp(80px, 18vw, 240px)",
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: -8,
              fontFamily: t.sans,
              color: i === 1 ? t.accent : t.ink,
              borderBottom: `1.5px solid ${t.ink}`,
              paddingBottom: 8,
              display: "flex",
              alignItems: "baseline",
              gap: 24,
            }}>
              <span>{w}</span>
              {i === 0 && <span style={{ fontSize: 14, fontFamily: t.mono, color: t.muted, marginLeft: "auto" }}>edition n°01</span>}
              {i === 1 && <span style={{ fontSize: 14, fontFamily: t.mono, color: t.muted, marginLeft: "auto" }}>{SIT.tracks.length} tracks</span>}
              {i === 2 && <span style={{ fontSize: 14, fontFamily: t.mono, color: t.muted, marginLeft: "auto" }}>paris · sept · 2026</span>}
            </div>
          ))}
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32,
          padding: "24px 0",
        }}>
          <div style={{ fontSize: 16, lineHeight: 1.5, maxWidth: 320 }}>
            [Tagline en une phrase : la communauté SAP francophone se rassemble pour la 1ère fois, format Inside Track, by us for us.]
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontFamily: t.mono, fontSize: 11, color: t.muted }}>OUVERTURE INSCRIPTIONS DANS</div>
            <Countdown compact />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
            <Btn primary size="lg">→ Notify me</Btn>
            <Btn ghost size="lg">→ Speak at SIT</Btn>
          </div>
        </div>
      </div>

      {/* programme — gros pavés */}
      <div style={{ background: t.ink, color: t.paperBright, padding: "56px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32 }}>
          <h2 style={{ fontSize: 80, margin: 0, fontWeight: 900, letterSpacing: -3 }}>Programme.</h2>
          <span style={{ fontFamily: t.mono, fontSize: 12, opacity: 0.6 }}>04 tracks // 25.09.2026</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          {SIT.tracks.map((tk, i) => (
            <div key={tk} style={{
              padding: "32px 24px",
              borderTop: `1px solid ${t.paperBright}`,
              borderRight: i % 2 === 0 ? `1px solid ${t.paperBright}` : "none",
              borderBottom: i < 2 ? `1px solid ${t.paperBright}` : "none",
              display: "flex", alignItems: "flex-start", gap: 20,
            }}>
              <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1, color: t.accent, fontFamily: t.mono, letterSpacing: -2 }}>
                0{i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 32, margin: 0, fontWeight: 800, letterSpacing: -1 }}>{tk}</h3>
                <Scribble lines={2} color={t.paperBright} style={{ marginTop: 16, opacity: 0.4 }} />
                <div style={{ fontFamily: t.mono, fontSize: 11, opacity: 0.5, marginTop: 16 }}>
                  Salle {i + 1} · 5 sessions · 09:00 → 17:30
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* speakers — call massif */}
      <div style={{ padding: "80px 32px", textAlign: "center", borderBottom: `1.5px solid ${t.ink}` }}>
        <div style={{ fontFamily: t.mono, fontSize: 12, color: t.accent, letterSpacing: 2 }}>★ CALL FOR SPEAKERS ★</div>
        <h2 style={{
          fontSize: "clamp(60px, 10vw, 120px)",
          margin: "16px 0",
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: -3,
        }}>
          Tu as quelque<br />chose à <em style={{ color: t.accent, fontStyle: "italic" }}>dire ?</em>
        </h2>
        <div style={{ maxWidth: 520, margin: "16px auto 32px", fontSize: 16, color: t.muted }}>
          [Court paragraphe sur les formats acceptés et le public. Encourage les premières prises de parole.]
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <Btn primary size="lg">→ Submit a talk</Btn>
          <Btn ghost size="lg">Voir les formats</Btn>
        </div>
      </div>

      {/* lieu band */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1.5px solid ${t.ink}` }}>
        <Img label="photo · SAP France HQ" h={400} style={{ borderRadius: 0, border: "none", borderRight: `1.5px solid ${t.ink}` }} />
        <div style={{ padding: 48, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: t.mono, fontSize: 11, color: t.muted, letterSpacing: 2 }}>LE LIEU</div>
          <h2 style={{ fontSize: 64, margin: "8px 0 16px", fontWeight: 900, letterSpacing: -2 }}>SAP France.</h2>
          <div style={{ fontSize: 16, color: t.muted, lineHeight: 1.6, marginBottom: 24 }}>
            [Description SAP France campus, accès, capacité, cadre.]
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontFamily: t.mono, fontSize: 12 }}>
            <div><div style={{ color: t.muted }}>METRO</div>L3 · Anatole France</div>
            <div><div style={{ color: t.muted }}>CAPACITÉ</div>{SIT.cap} pax</div>
            <div><div style={{ color: t.muted }}>SALLES</div>1 audi + 3 break</div>
            <div><div style={{ color: t.muted }}>RESTO</div>sur place inclus</div>
          </div>
        </div>
      </div>

      {/* sponsors marquee */}
      <div style={{ padding: "48px 32px", borderBottom: `1.5px solid ${t.ink}` }}>
        <h2 style={{ fontSize: 56, fontWeight: 900, margin: "0 0 24px", letterSpacing: -2 }}>Sponsors.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <Box key={i} h={70} dashed style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: t.mono, fontSize: 10, color: t.muted }}>logo</span>
            </Box>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <Btn ghost>→ Devenir sponsor fondateur</Btn>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: "48px 32px", borderBottom: `1.5px solid ${t.ink}` }}>
        <h2 style={{ fontSize: 56, fontWeight: 900, margin: "0 0 24px", letterSpacing: -2 }}>FAQ.</h2>
        {[
          "C'est quoi un SAP Inside Track ?",
          "C'est officiel ? C'est SAP qui organise ?",
          "Comment je peux speaker ?",
          "Y a-t-il un dress code ?",
          "Je suis junior, c'est pour moi ?",
        ].map((q, i) => (
          <div key={q} style={{
            padding: "20px 0",
            borderBottom: i < 4 ? `1px solid ${t.ink}` : "none",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24,
          }}>
            <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>{q}</span>
            <span style={{ fontFamily: t.mono, fontSize: 24, color: t.accent }}>+</span>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

// ───────── WIREFRAME 4 — Schedule grid first ─────────

function Wireframe4() {
  const t = window.__wfTheme || {};
  const slots = [
    { time: "08:30", type: "welcome", label: "Welcome coffee" },
    { time: "09:15", type: "keynote", label: "Keynote ouverture" },
    { time: "10:00", type: "sessions" },
    { time: "11:00", type: "sessions" },
    { time: "12:00", type: "break", label: "Lunch · networking" },
    { time: "14:00", type: "sessions" },
    { time: "15:00", type: "sessions" },
    { time: "16:00", type: "break", label: "Coffee · démos sponsors" },
    { time: "16:30", type: "sessions" },
    { time: "17:30", type: "keynote", label: "Closing + apéro" },
  ];
  return (
    <div style={{ background: t.paperBright, fontFamily: t.sans, color: t.ink, width: "100%" }}>
      <NavBar />

      {/* hero light, focus on grid */}
      <div style={{ padding: "32px 32px 16px", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: t.mono, fontSize: 11, color: t.accent, letterSpacing: 1.5 }}>
            ◆ FIRST EDITION · COMMUNITY-DRIVEN · {SIT.cap} SEATS
          </div>
          <h1 style={{ fontSize: 56, margin: "8px 0 12px", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1 }}>
            SAP Inside Track Paris.
          </h1>
          <div style={{ fontSize: 17, color: t.muted, maxWidth: 560 }}>
            Une journée. Quatre tracks. La communauté SAP francophone réunie pour la première fois à {SIT.venue}, le {SIT.date}.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
          <Countdown compact />
          <div style={{ display: "flex", gap: 8 }}>
            <Btn primary>→ Pre-register</Btn>
            <Btn ghost>Submit talk</Btn>
          </div>
        </div>
      </div>

      {/* THE GRID — main feature */}
      <div style={{ padding: "24px 32px 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
          <h2 style={{ fontSize: 32, margin: 0, fontWeight: 700, letterSpacing: -0.5 }}>Le programme</h2>
          <div style={{ display: "flex", gap: 6, fontFamily: t.mono, fontSize: 11 }}>
            {SIT.tracks.map((tk, i) => (
              <span key={tk} style={{
                padding: "4px 10px",
                background: i === 0 ? t.accent : "transparent",
                color: i === 0 ? t.paperBright : t.ink,
                border: `1.5px solid ${t.ink}`,
                borderRadius: 4,
              }}>T{i + 1}</span>
            ))}
            <span style={{ marginLeft: 8, color: t.muted, alignSelf: "center" }}>filter ↑</span>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: `80px repeat(4, 1fr)`,
          border: `1.5px solid ${t.ink}`,
          borderRadius: 8,
          overflow: "hidden",
          background: t.paper,
        }}>
          {/* header row */}
          <div style={{ padding: 14, background: t.ink, color: t.paperBright, fontFamily: t.mono, fontSize: 10 }}>HEURE</div>
          {SIT.tracks.map((tk, i) => (
            <div key={tk} style={{
              padding: 14,
              background: t.ink, color: t.paperBright,
              borderLeft: `1px solid ${t.muted}`,
            }}>
              <div style={{ fontFamily: t.mono, fontSize: 10, opacity: 0.6 }}>TRACK 0{i + 1}</div>
              <div style={{ fontWeight: 700, fontSize: 13, marginTop: 2 }}>{tk}</div>
            </div>
          ))}

          {slots.map((s, r) => {
            const span = s.type !== "sessions";
            return (
              <React.Fragment key={r}>
                <div style={{
                  padding: 12, fontFamily: t.mono, fontSize: 11, color: t.muted,
                  borderTop: `1px solid ${t.ink}`,
                  display: "flex", alignItems: "flex-start",
                }}>{s.time}</div>
                {span ? (
                  <div style={{
                    gridColumn: "span 4",
                    padding: 14,
                    borderTop: `1px solid ${t.ink}`,
                    background: s.type === "keynote" ? t.accentSoft : t.stripe,
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <span style={{
                      fontFamily: t.mono, fontSize: 9,
                      padding: "2px 6px",
                      background: t.ink, color: t.paperBright,
                      borderRadius: 3,
                    }}>{s.type.toUpperCase()}</span>
                    <span style={{ fontWeight: 600 }}>{s.label}</span>
                  </div>
                ) : (
                  [0, 1, 2, 3].map((c) => (
                    <div key={c} style={{
                      padding: 12,
                      borderTop: `1px solid ${t.ink}`,
                      borderLeft: `1px solid ${t.ink}`,
                      minHeight: 80,
                      position: "relative",
                    }}>
                      <div style={{
                        fontFamily: t.mono, fontSize: 9,
                        color: t.muted,
                        marginBottom: 6,
                      }}>[? · 30min · ? speaker]</div>
                      <Scribble lines={2} width={(i) => `${85 - i * 20}%`} height={5} />
                      <div style={{
                        position: "absolute", bottom: 8, left: 12,
                        fontFamily: t.mono, fontSize: 9, color: t.muted,
                      }}>↳ TBD</div>
                    </div>
                  ))
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontFamily: t.mono, fontSize: 11, color: t.muted }}>
          <span>* Programme prévisionnel — call for speakers ouvert</span>
          <span>↓ Télécharger ICS / PDF</span>
        </div>
      </div>

      {/* speakers wall */}
      <div style={{ padding: "32px", borderTop: `1.5px solid ${t.ink}`, borderBottom: `1.5px solid ${t.ink}`, background: t.paper }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 28, margin: 0, fontWeight: 700 }}>Speakers · le mur</h2>
          <Btn primary size="sm">+ Soumettre un talk</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 10 }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} style={{
              aspectRatio: "1",
              border: `1.5px dashed ${t.muted}`,
              borderRadius: "10px 12px 9px 11px",
              background: `repeating-linear-gradient(${i * 13}deg, transparent 0 5px, ${t.stripe} 5px 6px)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: t.mono, fontSize: 16, color: t.muted,
            }}>?</div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontFamily: t.mono, fontSize: 11, color: t.muted, textAlign: "center" }}>
          16 emplacements · à dévoiler progressivement
        </div>
      </div>

      {/* lieu compact */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: `1.5px solid ${t.ink}` }}>
        <div style={{ padding: 24, borderRight: `1.5px solid ${t.ink}` }}>
          <SectionHead title="Lieu" />
          <div style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{SIT.venue}</div>
            <div style={{ color: t.muted, fontFamily: t.mono, fontSize: 12, marginTop: 4 }}>
              35 rue d'Alsace · Levallois<br />
              Métro L3 · Anatole France
            </div>
          </div>
        </div>
        <Img label="photo · SAP HQ" h="100%" style={{ borderRadius: 0, border: "none", borderRight: `1.5px solid ${t.ink}` }} />
        <Img label="map" h="100%" style={{ borderRadius: 0, border: "none" }} />
      </div>

      {/* sponsors + faq combo */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr" }}>
        <div style={{ padding: 32, borderRight: `1.5px solid ${t.ink}` }}>
          <SectionHead title="Sponsors" subtitle="Première édition — places limitées côté sponsors aussi." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 16 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Box key={i} h={64} dashed style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: t.mono, fontSize: 10, color: t.muted }}>tier {i < 2 ? "1" : i < 5 ? "2" : "3"}</span>
              </Box>
            ))}
          </div>
        </div>
        <div style={{ padding: 32 }}>
          <SectionHead title="FAQ" />
          <div style={{ marginTop: 16 }}>
            {[
              "C'est quoi un Inside Track ?",
              "Première édition FR ?",
              "Comment speaker ?",
              "Code of conduct ?",
            ].map((q, i) => (
              <div key={q} style={{ padding: "12px 0", borderBottom: i < 3 ? `1px solid ${t.muted}` : "none", fontSize: 14, display: "flex", justifyContent: "space-between" }}>
                <span>{q}</span>
                <span style={{ color: t.accent }}>+</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

window.Wireframe1 = Wireframe1;
window.Wireframe2 = Wireframe2;
window.Wireframe3 = Wireframe3;
window.Wireframe4 = Wireframe4;
