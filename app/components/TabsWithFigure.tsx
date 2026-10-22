"use client";
import { useState, type ReactNode } from "react";

export type TabItem = {
  title: string;
  body: ReactNode;
  image: { src: string; alt: string };
};

export default function TabsWithFigure({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(0);
  const item = items[active];

  return (
    <div className="tabsFigure">
      <div className="tabList" role="tablist">
        {items.map((it, i) => (
          <button
            key={it.title}
            id={`tab-${i}`}
            role="tab"
            className={`tab${i === active ? " tab--active" : ""}`}
            aria-selected={i === active}
            aria-controls="tab-panel"
            onClick={() => setActive(i)}
          >
            {it.title}
          </button>
        ))}
      </div>
      <div key={active} id="tab-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="tabPanel">
        <div className="tabPanelText">{item.body}</div>
        <div className="tabPanelImage">
          <img src={item.image.src} alt={item.image.alt} />
        </div>
      </div>
    </div>
  );
}
