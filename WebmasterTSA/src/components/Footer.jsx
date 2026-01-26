const COLORS = {
  carolinaBlue: "#4B9CD3",
  beige: "#F5FCEF",
  text: "#111111",
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <style>{css}</style>

      <div style={styles.inner} className="footer-inner">
        <div style={styles.colLeft}>
          <h3 style={styles.footerTitle}>Connecting the Triangle to resources.</h3>
          <p style={styles.footerText}>
            Nexus helps residents find programs, scholarships, volunteering, and support services: fast, inclusive, and easy to navigate.
          </p>
        </div>

        <div style={styles.col}>
          <div style={styles.colHeader}>Links</div>
          <a style={styles.link} href="/">Home</a>
          <a style={styles.link} href="/mission">Our Mission</a>
          <a style={styles.link} href="/resource-hub">The Hub</a>
          <a style={styles.link} href="/build-the-hub">Grow the Hub</a>
          <a style={styles.link} href="/find-ecs">Discover</a>
          <a style={styles.link} href="/work-logs">Documentation</a>
        </div>

        <div style={styles.colRight} className="footer-colRight">
          <div style={styles.colHeader}>Connect With Us</div>

          <div style={styles.iconRow} className="footer-iconRow">
            <a
              style={styles.iconLink}
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <IconFacebook />
            </a>
            <a
              style={styles.iconLink}
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <IconInstagram />
            </a>
            <a
              style={styles.iconLink}
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
            >
              <IconX />
            </a>
            <a
              style={styles.iconLink}
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <IconYouTube />
            </a>
          </div>

          <div style={styles.contactBlock} className="footer-contactBlock">
            <div style={styles.contactLine}>
              <span style={styles.contactIcon} aria-hidden="true">
                <CuteMailIcon />
              </span>
              <span>hello@nexus.com</span>
            </div>
            <div style={styles.contactLine}>
              <span style={styles.contactIcon} aria-hidden="true">
                <CutePhoneIcon />
              </span>
              <span>+1 (123) 456-7890</span>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <div style={styles.bottomInner} className="footer-bottomInner">
          <span>© {new Date().getFullYear()} Nexus</span>
          <span style={styles.bottomRight} className="footer-bottomRight">
            Built for the Research Triangle Community
          </span>
        </div>
      </div>
    </footer>
  );
}

function IconFacebook() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 8.5V7.2c0-.9.6-1.2 1.2-1.2H17V3h-2.2C12.6 3 12 4.6 12 6.7V8.5H10v3h2V21h3v-9.5h2.2l.3-3H15z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM18 6.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M18.9 3H22l-6.8 7.8L23 21h-6.2l-4.9-6.2L6.6 21H3l7.4-8.5L1 3h6.4l4.4 5.6L18.9 3zm-1.1 16h1.7L6.1 4.9H4.3L17.8 19z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.5.5A3 3 0 0 0 2.4 7.2 31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function CuteMailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 8.2A3.2 3.2 0 0 1 8.2 5h7.6A3.2 3.2 0 0 1 19 8.2v7.6A3.2 3.2 0 0 1 15.8 19H8.2A3.2 3.2 0 0 1 5 15.8V8.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M7 9l4.3 3.1c.42.3.98.3 1.4 0L17 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.2 15.7c-.7.1-1.4-.2-2-.8l-.3-.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CutePhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M8.6 4.3 7.2 5.7c-.9.9-1.1 2.3-.5 3.6 1.6 3.2 4.5 6.1 7.7 7.7 1.3.6 2.7.4 3.6-.5l1.4-1.4c.5-.5.5-1.3 0-1.8l-2-2c-.4-.4-1-.5-1.5-.2l-1 .6c-.3.2-.7.2-1 0-.9-.6-1.8-1.4-2.6-2.3-.2-.3-.2-.7 0-1l.6-1c.3-.5.2-1.1-.2-1.5l-2-2c-.5-.5-1.3-.5-1.8 0Z"
        fill="currentColor"
      />
      <path
        d="M17.5 6.8c1.1.7 1.8 1.8 2 3.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M16 8.4c.7.4 1.1 1.1 1.2 1.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const styles = {
  footer: {
    backgroundColor: COLORS.carolinaBlue,
    color: COLORS.text,
    paddingTop: "46px",
    overflowX: "hidden",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px 34px 20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "26px",
    boxSizing: "border-box",
    alignItems: "start",
  },
  colLeft: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  footerTitle: {
    margin: "6px 0 10px 0",
    fontFamily: "var(--font-heading)",
    fontSize: "1.35rem",
    fontWeight: 900,
  },
  footerText: {
    margin: 0,
    fontFamily: "var(--font-body)",
    lineHeight: 1.7,
    opacity: 0.95,
    maxWidth: "60ch",
  },
  col: { display: "flex", flexDirection: "column", gap: "10px", minWidth: 0 },
  colHeader: {
    fontFamily: "var(--font-heading)",
    fontWeight: 900,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    fontSize: "0.95rem",
    marginBottom: "6px",
  },
  link: {
    fontFamily: "var(--font-body)",
    color: COLORS.text,
    textDecoration: "underline",
    opacity: 0.9,
  },
  colRight: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    justifySelf: "end",
    alignItems: "flex-end",
    minWidth: 0,
  },
  iconRow: { display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" },
  iconLink: {
    color: COLORS.text,
    width: "40px",
    height: "40px",
    borderRadius: "999px",
    display: "grid",
    placeItems: "center",
    backgroundColor: "rgba(245,252,239,0.55)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
    textDecoration: "none",
    lineHeight: 0,
  },
  contactBlock: {
    backgroundColor: "rgba(245,252,239,0.55)",
    borderRadius: "14px",
    padding: "12px 14px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
    width: "min(360px, 100%)",
  },
  contactLine: {
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "6px 0",
    flexWrap: "wrap",
  },
  contactIcon: {
    display: "grid",
    placeItems: "center",
    width: "28px",
    height: "28px",
    borderRadius: "999px",
    backgroundColor: "rgba(73,74,72,0.10)",
  },
  bottomBar: {
    borderTop: "1px solid rgba(0,0,0,0.15)",
    padding: "14px 0",
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  bottomInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    boxSizing: "border-box",
  },
  bottomRight: { opacity: 0.9, textAlign: "right" },
};

const css = `
  @media (max-width: 820px) {
    .footer-colRight {
      justify-self: start !important;
      align-items: flex-start !important;
    }
    .footer-iconRow {
      justify-content: flex-start !important;
    }
    .footer-bottomInner {
      justify-content: center !important;
      text-align: center;
    }
    .footer-bottomRight {
      text-align: center !important;
    }
    .footer-contactBlock {
      width: 100% !important;
      max-width: 520px;
    }
  }
`;
