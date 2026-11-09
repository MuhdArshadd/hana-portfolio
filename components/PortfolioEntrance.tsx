"use client";
import { useEffect, useRef, useState } from "react";

/** A timed welcome animation, independent of network loading progress. */
export default function PortfolioEntrance({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const page = content.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (page) page.inert = true;
    const timer = window.setTimeout(() => {
      if (page) page.inert = false;
      document.body.style.overflow = previousOverflow;
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
      if (page) page.inert = false;
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  useEffect(() => {
    if (loading || !content.current) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(content.current.querySelectorAll<HTMLElement>("main > section:not(.hero), main > .bottom-grid > section, .project-card, .skill-group, .job"));
    if (media.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0, rootMargin: "0px 0px -35px 0px" });
    for (const element of elements) {
      if (element.getBoundingClientRect().top >= window.innerHeight - 35) {
        element.classList.add("scroll-reveal");
        observer.observe(element);
      }
    }
    const showAll = () => {
      if (media.matches) {
        observer.disconnect();
        elements.forEach(element => element.classList.add("revealed"));
      }
    };
    media.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", showAll);
      elements.forEach(element => element.classList.remove("scroll-reveal", "revealed"));
    };
  }, [loading]);
  return <>
    {loading && <div className="welcome-overlay"><div className="welcome-window" role="status" aria-live="polite"><div className="welcome-title"><span>Loading...</span><span aria-hidden="true">♡</span></div><div className="welcome-body"><p>Preparing Hana’s little corner...</p><div className="welcome-progress" aria-hidden="true"><div className="welcome-progress-fill"/></div><span className="welcome-caption">a little care in every detail</span></div></div></div>}
    <div ref={content} className={loading ? "portfolio-content entering" : "portfolio-content ready"} aria-busy={loading}>{children}</div>
    <noscript><style>{`.welcome-overlay{display:none!important}.portfolio-content.entering{opacity:1!important}`}</style></noscript>
  </>;
}
