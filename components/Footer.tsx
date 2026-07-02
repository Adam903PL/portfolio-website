import React from 'react';

const Footer = () => {
  return (
    <footer
      className="side-pad relative z-[2] flex flex-wrap items-center justify-between gap-4 border-t pb-12 pt-9"
      style={{ borderColor: 'rgba(26,23,18,0.16)' }}
    >
      <div className="flex items-center gap-3.5">
        <span className="flex size-[30px] items-center justify-center bg-ink font-mono text-[13px] font-bold text-cream">
          AP
        </span>
        <span className="font-mono text-[12px] text-ink-40">
          © 2026 Adam Pukaluk — Lublin, Poland
        </span>
      </div>
      <div className="flex gap-[22px] font-mono text-[12px]">
        <a
          href="https://github.com/Adam903PL/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-40 no-underline transition-colors hover:text-ink"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/adam-pukaluk-339058298/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-40 no-underline transition-colors hover:text-ink"
        >
          LinkedIn
        </a>
        <a
          href="/privacy-policy"
          className="text-ink-40 no-underline transition-colors hover:text-ink"
        >
          Privacy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
