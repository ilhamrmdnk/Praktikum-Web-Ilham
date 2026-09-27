export default function Home() {
  const skills = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "UI/UX Design"];
  const links = [
    {
      label: "Email",
      href: "mailto:ilham@example.com",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 7 10 7 10-7" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      href: "https://github.com/",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.43 2.865 8.185 6.839 9.51.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          height: 100%;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Helvetica, Arial, sans-serif;
          background: #f5f5f5;
          color: #111;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Page shell ─────────────────────────────── */
        .page {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 2rem 1.25rem;
          background: #f5f5f5;
        }

        /* ── Hero card ──────────────────────────────── */
        .card {
          width: 100%;
          max-width: 860px;
          background: #fff;
          border-radius: 24px;
          border: 1px solid #e4e4e4;
          box-shadow: 0 8px 48px rgba(0,0,0,.07), 0 1px 4px rgba(0,0,0,.04);
          overflow: hidden;
          display: grid;
          grid-template-columns: 320px 1fr;
        }

        /* ── Left panel ─────────────────────────────── */
        .panel-left {
          background: #111;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          gap: 1.25rem;
          position: relative;
          overflow: hidden;
        }

        /* subtle texture dots */
        .panel-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #ffffff18 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events: none;
        }

        .avatar-ring {
          position: relative;
          z-index: 1;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(145deg, #555, #222);
          box-shadow: 0 0 0 1px #ffffff22;
        }

        .avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          background: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.5rem;
          overflow: hidden;
        }

        .avatar-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(145deg, #3a3a3a, #222);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.5rem;
        }

        .status-badge {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: #ffffff12;
          border: 1px solid #ffffff20;
          border-radius: 999px;
          padding: 0.3rem 0.85rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #ccc;
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 6px #4ade8088;
          flex-shrink: 0;
        }

        .role-pill {
          position: relative;
          z-index: 1;
          background: #ffffff10;
          border: 1px solid #ffffff18;
          border-radius: 8px;
          padding: 0.75rem 1.25rem;
          text-align: center;
          width: 100%;
        }

        .role-pill strong {
          display: block;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .role-pill span {
          display: block;
          color: #999;
          font-size: 0.78rem;
          margin-top: 0.2rem;
          letter-spacing: 0.02em;
        }

        /* ── Right panel ─────────────────────────────── */
        .panel-right {
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.75rem;
        }

        .eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #aaa;
        }

        .name {
          font-size: 2.75rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.1;
          color: #111;
          margin-top: 0.25rem;
        }

        .name span {
          display: block;
          color: #bbb;
          font-weight: 300;
          font-size: 1.6rem;
          letter-spacing: -0.02em;
        }

        .bio {
          font-size: 0.95rem;
          line-height: 1.8;
          color: #555;
          max-width: 400px;
        }

        /* ── Skills ─────────────────────────────────── */
        .section-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #bbb;
          margin-bottom: 0.6rem;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .tag {
          padding: 0.3rem 0.8rem;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 500;
          background: #f0f0f0;
          color: #444;
          border: 1px solid #e4e4e4;
          letter-spacing: 0.01em;
          transition: background 0.15s, border-color 0.15s;
        }

        .tag:hover {
          background: #111;
          color: #fff;
          border-color: #111;
        }

        /* ── Divider ─────────────────────────────────── */
        .hr {
          height: 1px;
          background: #f0f0f0;
          width: 100%;
        }

        /* ── Social links ────────────────────────────── */
        .links {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 1.15rem;
          border-radius: 10px;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          color: #333;
          background: #fafafa;
          border: 1.5px solid #e4e4e4;
          transition: all 0.15s ease;
          cursor: pointer;
        }

        .link-btn:hover {
          background: #111;
          border-color: #111;
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,.15);
        }

        .link-btn:hover svg {
          filter: brightness(10);
        }

        /* ── Footer strip ────────────────────────────── */
        .footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.72rem;
          color: #ccc;
          letter-spacing: 0.05em;
        }

        /* ── Responsive ──────────────────────────────── */
        @media (max-width: 680px) {
          .card {
            grid-template-columns: 1fr;
            border-radius: 18px;
          }

          .panel-left {
            padding: 2.5rem 1.75rem;
          }

          .avatar-ring {
            width: 110px;
            height: 110px;
          }

          .panel-right {
            padding: 2rem 1.75rem;
            gap: 1.25rem;
          }

          .name {
            font-size: 2.1rem;
          }

          .name span {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 400px) {
          .links {
            flex-direction: column;
          }

          .link-btn {
            justify-content: center;
          }
        }
      `}</style>

      <div className="page">
        <div>
          {/* ── Card ── */}
          <div className="card">

            {/* Left — dark panel */}
            <div className="panel-left">
              <div className="avatar-ring">
                {/*
                  To use your own photo, replace the div below with:
                  <img src="/profile.jpg" alt="Ilham" style={{width:'100%',height:'100%',borderRadius:'50%',objectFit:'cover'}} />
                  and place profile.jpg in the /public folder.
                */}
                <div className="avatar-inner">👤</div>
              </div>

              <div className="status-badge">
                <span className="dot" />
                Available for work
              </div>

              <div className="role-pill">
                <strong>Full-Stack Developer</strong>
                <span>Jakarta, Indonesia</span>
              </div>
            </div>

            {/* Right — content panel */}
            <div className="panel-right">
              <div>
                <p className="eyebrow">Hello, I&apos;m</p>
                <h1 className="name">
                  Ilham
                  <span>Muhamad Ilham</span>
                </h1>
              </div>

              <p className="bio">
                I&apos;m a passionate web developer who loves turning ideas into
                clean, fast, and accessible digital products. I focus on writing
                maintainable code and crafting seamless user experiences — from
                pixel-perfect interfaces to robust back-end systems.
              </p>

              <div>
                <p className="section-label">Skills &amp; Tools</p>
                <div className="tags">
                  {skills.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>

              <div className="hr" />

              <div>
                <p className="section-label">Get in touch</p>
                <div className="links">
                  {links.map((l) => (
                    <a key={l.label} href={l.href} className="link-btn" target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                      {l.icon}
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="footer">
            © {new Date().getFullYear()} Ilham · Built with Next.js
          </p>
        </div>
      </div>
    </>
  );
}
