"use client";
import type { ReactNode } from "react";

export type RevealItem = {
  title: string;
  body: ReactNode;
  image: { src: string; alt: string };
};

// Reveals items one at a time. `step` is how many items are revealed (0 = none);
// the most recently revealed item is shown in the panel.
export default function StepReveal({
  items,
  step,
  onSelect,
}: {
  items: RevealItem[];
  step: number;
  onSelect: (step: number) => void;
}) {
  const item = step > 0 ? items[step - 1] : null;

  return (
    <div className="tabsFigure">
      <div className="tabList">
        {items.map((it, i) => {
          const revealed = i < step;
          const active = i === step - 1;
          return (
            <button
              key={it.title}
              className={`tab${active ? " tab--active" : ""}${revealed ? "" : " tab--pending"}`}
              aria-current={active ? "step" : undefined}
              disabled={!revealed}
              onClick={() => onSelect(i + 1)}
            >
              {it.title}
            </button>
          );
        })}
      </div>
      {item && (
        <div key={step} className="tabPanel">
          <div className="tabPanelText">{item.body}</div>
          <div className="tabPanelImage">
            <img src={item.image.src} alt={item.image.alt} />
          </div>
        </div>
      )}
    </div>
  );
}
