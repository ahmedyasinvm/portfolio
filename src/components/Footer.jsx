const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1-5-3-7-4m14 8v-3.87a3.37 3.37 0 0 0-.94-2.6c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <line x1="8" y1="11" x2="8" y2="16" />
    <circle cx="8" cy="8" r="1" />
    <path d="M12 16v-3c0-1 1-2 2.5-2s2.5 1 2.5 3v3" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            Ahmed<span>.</span>
          </div>

          <div className="footer-socials">
            <a
              href="https://github.com/ahmedyasinvm"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://linkedin.com/in/ahmed-yasin-vm"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>

          <p className="footer-copy">
            © 2026 Ahmed Yasin — Built with Python &amp; ☕
          </p>

          <a href="#home" className="footer-top-btn" aria-label="Back to top">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            Top
          </a>
        </div>
      </div>
    </footer>
  );
}
