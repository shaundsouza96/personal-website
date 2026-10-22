"use client";
import type { ReactNode } from "react";

export type FigureColumn = {
  title: string;
  body: ReactNode;
  image: { src: string; alt: string };
};

export default function FigureColumns({ items }: { items: FigureColumn[] }) {
  return (
    <div className="figureColumns">
      {items.map((item, i) => (
        <section key={item.title} className="figureColumn">
          <h3 className="figureColumnTitle">
            <span className="figureColumnNumber">{i + 1}</span>
            {item.title}
          </h3>
          <img className="figureColumnImage" src={item.image.src} alt={item.image.alt} />
          <p className="figureColumnBody">{item.body}</p>
        </section>
      ))}
    </div>
  );
}
