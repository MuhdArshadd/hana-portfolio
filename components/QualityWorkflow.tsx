"use client";
import { useEffect, useRef, useState } from "react";
import { Search, Bug, ClipboardList, Check } from "lucide-react";
const steps = [
  { title: "Explore", description: "Understand the user journey", Icon: Search },
  { title: "Test", description: "Look beyond the happy path", Icon: Bug },
  { title: "Report", description: "Make the details actionable", Icon: ClipboardList },
  { title: "Verify", description: "Check the fix, with care", Icon: Check },
];
export default function QualityWorkflow() {
  const ref = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const entrance = element.closest(".portfolio-content");
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting) && entrance?.getAttribute("aria-busy") !== "true") {
        setPlayed(true);
        observer.disconnect();
        mutation.disconnect();
      }
    }, { threshold: .3 });
    const mutation = new MutationObserver(() => {
      if (entrance?.getAttribute("aria-busy") !== "true") {
        observer.unobserve(element);
        observer.observe(element);
      }
    });
    if (entrance) mutation.observe(entrance, { attributes: true, attributeFilter: ["aria-busy"] });
    observer.observe(element);
    return () => { observer.disconnect(); mutation.disconnect(); };
  }, []);
  return <div ref={ref} className={`quality-workflow${played ? " is-playing" : ""}`} role="region" aria-label="A thoughtful approach to quality">
    <div className="workflow-intro"><span className="eyebrow">A THOUGHTFUL APPROACH</span><p>Care in every <span className="serif">step.</span></p></div>
    <ol className="workflow-steps">{steps.map(({ title, description, Icon }, index) => <li className={`workflow-step workflow-step-${index}`} key={title}>
      <div className="workflow-icon" aria-hidden="true"><Icon size={23} strokeWidth={1.5}/><span className="workflow-number">0{index + 1}</span></div>
      <div className="workflow-copy"><h3>{title}</h3><p>{description}</p></div>
    </li>)}</ol>
  </div>;
}
