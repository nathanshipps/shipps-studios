"use client";

import WeatherWidget from "@/components/WeatherWidget";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        paddingLeft: "clamp(2rem, 6vw, 6rem)",
        paddingRight: "clamp(2rem, 6vw, 6rem)",
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
      }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "var(--fg-subtle)" }}>
            Portland, OR — Pacific Northwest
          </p>
          <WeatherWidget />
          <p className="font-mono text-[10px] tracking-[0.15em]" style={{ color: "var(--fg-faint)" }}>
            © {new Date().getFullYear()} nateshipps. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-5">
          <a
            href="mailto:nateshipps@gmail.com"
            className="hover-accent font-mono tracking-[0.15em] transition-colors duration-300"
            style={{ fontSize: "clamp(0.75rem, 1.5vw, 1rem)", color: "var(--fg-subtle)" }}
          >
            nateshipps@gmail.com
          </a>
          <div className="flex gap-4 items-center">

            <a href="https://www.instagram.com/nathanshipps/" target="_blank" rel="noopener noreferrer" className="hover-accent transition-colors duration-300 p-2 -m-2" style={{ color: "var(--fg-subtle)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://dribbble.com/nateshipps" target="_blank" rel="noopener noreferrer" className="hover-accent transition-colors duration-300 p-2 -m-2" style={{ color: "var(--fg-subtle)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
